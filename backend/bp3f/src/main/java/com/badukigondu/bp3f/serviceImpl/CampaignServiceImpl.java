package com.badukigondu.bp3f.serviceImpl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.dao.CampaignDao;
import com.badukigondu.bp3f.dao.UserDao;
import com.badukigondu.bp3f.jwt.JwtUtil;
import com.badukigondu.bp3f.pojo.Campaign;
import com.badukigondu.bp3f.pojo.User;
import com.badukigondu.bp3f.service.CampaignService;
import com.badukigondu.bp3f.utils.Bp3fUtils;
import com.badukigondu.bp3f.wrapper.CampaignWrapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CampaignServiceImpl implements CampaignService {

    @Autowired
    CampaignDao campaignDao;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    UserDao userDao;

    @Override
    public ResponseEntity<String> addCampaign(Map<String, String> requestMap, String token) {
        try {

            String email = jwtUtil.extractUserName(token.substring(7));

            if (validateCampaignMap(requestMap)) {
                campaignDao.save(getCampaignFromMap(requestMap, email));
                return Bp3fUtils.getResponseEntity("Campaign Added Successfully", HttpStatus.OK);
            } else {
                return Bp3fUtils.getResponseEntity(Bp3fConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateCampaignMap(Map<String, String> requestMap) {
        if (requestMap.containsKey("title") && requestMap.containsKey("description")
                && requestMap.containsKey("goalAmount")) {
            return true;
        }
        return false;
    }

    private Campaign getCampaignFromMap(Map<String, String> requestMap, String email) throws ParseException {

        log.info("user email {}", email);

        User user = userDao.findByEmail(email);

        Campaign campaign = new Campaign();

        campaign.setDescription(requestMap.get("description"));
        campaign.setGoalAmount(Long.parseLong(requestMap.get("goalAmount")));

        campaign.setTitle(requestMap.get("title"));
        campaign.setCategory(requestMap.get("category"));
        campaign.setAmountRecieved(0L);
        campaign.setAmountWithdrawn(0L);
        campaign.setBoost(0L);
        campaign.setStatus(Bp3fConstants.ACTIVE);
        campaign.setRequiredBy(new SimpleDateFormat("yyyy-MM-dd").parse(requestMap.get("requiredBy")));
        log.info("Date: {}", campaign.getRequiredBy());
        campaign.setUser(user);

        if (!requestMap.get("imageLink").equalsIgnoreCase("")) {
            campaign.setImageLink(requestMap.get("imageLink"));
        } else {
            String defaultImageUrl = "https://s3.ap-south-1.amazonaws.com/bp3f-bucket/CampaignImages/donation-image.png";
            campaign.setImageLink(defaultImageUrl);
        }

        return campaign;
    }

    @Override
    public ResponseEntity<List<CampaignWrapper>> getAllCampaign() {
        try {
            return new ResponseEntity<>(campaignDao.findAllCampaign(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<CampaignWrapper> getCampaignById(Long id) {
        try {
            return new ResponseEntity<>(campaignDao.getCampaignById(id), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new CampaignWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<CampaignWrapper>> getCampaignByUserId(Long userId) {
        try {
            return new ResponseEntity<>(campaignDao.getCampaignByUserId(userId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateStatus(Long id, Map<String, String> requestMap) {
        try {

            Campaign campaign = campaignDao.findById(id).get();

            if (campaign.getUser().getId() != userDao.findByEmail(jwtUtil.getUserEmail()).getId() && !jwtUtil.isAdmin()) {
                log.info("Not Same User");
                return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG,
                        HttpStatus.INTERNAL_SERVER_ERROR);
            }

            User user = userDao.findByEmail(jwtUtil.getUserEmail());

            log.info("User {}", user.getId());

            if (requestMap.containsKey("status")) {
                if (campaign.getStatus().equalsIgnoreCase(Bp3fConstants.GOAL_REACHED)) {
                    return Bp3fUtils.getResponseEntity("Goal Already Reached.", HttpStatus.UNAUTHORIZED);
                } else if (campaign.getStatus().equalsIgnoreCase(Bp3fConstants.DEACTIVATED_BY_ADMIN)
                        && !jwtUtil.isAdmin()) {
                    return Bp3fUtils.getResponseEntity("Cannot Change Because Deactivated By Admin.",
                            HttpStatus.UNAUTHORIZED);
                } else {
                    if (Boolean.parseBoolean(requestMap.get("status")) == false) {
                        if (jwtUtil.isAdmin()) {
                            campaign.setStatus(Bp3fConstants.DEACTIVATED_BY_ADMIN);
                            campaignDao.save(campaign);
                            return Bp3fUtils.getResponseEntity("Status Deactivated By Admin.", HttpStatus.OK);
                        } else if (campaign.getUser().getId() == user.getId()) {
                            campaign.setStatus(Bp3fConstants.DEACTIVATED_BY_USER);
                            campaignDao.save(campaign);
                            return Bp3fUtils.getResponseEntity("Status Deactivated By User.", HttpStatus.OK);
                        }
                    } else if (Boolean.parseBoolean(requestMap.get("status")) == true) {

                        if (jwtUtil.isAdmin()) {
                            campaign.setStatus(Bp3fConstants.ACTIVE);
                            campaignDao.save(campaign);
                            return Bp3fUtils.getResponseEntity("Status Activated By Admin.", HttpStatus.OK);
                        } else if (campaign.getUser().getId() == user.getId()) {
                            campaign.setStatus(Bp3fConstants.ACTIVE);
                            campaignDao.save(campaign);
                            return Bp3fUtils.getResponseEntity("Status Activated By User.", HttpStatus.OK);
                        }
                    }
                    // return Bp3fUtils.getResponseEntity("Status Updated", HttpStatus.OK);
                }
            } else {
                return Bp3fUtils.getResponseEntity(Bp3fConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateCampaign(Long id, Map<String, String> requestMap) {
        try {

            if (validateCampaignMap(requestMap)) {
                Campaign campaign = campaignDao.findById(id).get();

                if (campaign.getUser().getId() != userDao.findByEmail(jwtUtil.getUserEmail()).getId() && !jwtUtil.isAdmin()) {
                    log.info("Not Same User");
                    return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG,
                            HttpStatus.INTERNAL_SERVER_ERROR);
                }

                campaign.setTitle(requestMap.get("title"));
                campaign.setDescription(requestMap.get("description"));
                campaign.setGoalAmount(Long.parseLong(requestMap.get("goalAmount")));
                campaign.setCategory(requestMap.get("category"));
                campaign.setRequiredBy(new SimpleDateFormat("yyyy-MM-dd").parse(requestMap.get("requiredBy")));

                campaignDao.save(campaign);

                return Bp3fUtils.getResponseEntity("Successfully Updated", HttpStatus.OK);

            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteCampaign(Long id) {
        try {
            campaignDao.deleteById(id);
            return Bp3fUtils.getResponseEntity("Campaign Deleted.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateCampaignImage(Long id, Map<String, String> requestMap) {
        try {

            if (requestMap.containsKey("imageLink")) {

                campaignDao.updateCampaignImage(id, requestMap.get("imageLink"));

                return Bp3fUtils.getResponseEntity("Image Successfully Updated", HttpStatus.OK);

            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
