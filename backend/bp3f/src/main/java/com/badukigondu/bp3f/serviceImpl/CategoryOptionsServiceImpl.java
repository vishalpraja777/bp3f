package com.badukigondu.bp3f.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.dao.CategoryOptionsDao;
import com.badukigondu.bp3f.jwt.JwtUtil;
import com.badukigondu.bp3f.pojo.CategoryOptions;
import com.badukigondu.bp3f.service.CategoryOptionsService;
import com.badukigondu.bp3f.utils.Bp3fUtils;

@Service
public class CategoryOptionsServiceImpl implements CategoryOptionsService {

    @Autowired
    CategoryOptionsDao categoryOptionsDao;

    @Autowired
    JwtUtil jwtUtil;

    @Override
    public ResponseEntity<String> addCampaignCategory(Map<String, String> requestMap) {
        try {
            if (jwtUtil.isAdmin()) {
                categoryOptionsDao.save(getCategoryOptionsFromMap(requestMap));
                return Bp3fUtils.getResponseEntity("Category Added Successfully", HttpStatus.OK);
            } else {
                return Bp3fUtils.getResponseEntity(Bp3fConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private CategoryOptions getCategoryOptionsFromMap(Map<String, String> requestMap) {

        CategoryOptions categoryOptions = new CategoryOptions();

        categoryOptions.setCategory(requestMap.get("category"));
        categoryOptions.setStatus(true);

        return categoryOptions;
    }

    @Override
    public ResponseEntity<List<CategoryOptions>> getAllCampaignCategory() {

        try {
            // if (jwtUtil.isAdmin()) {
                return new ResponseEntity<>(categoryOptionsDao.findAll(), HttpStatus.OK);
            // } else {
            //     return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            // }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteCampaignCategory(Long id) {
        try {
            if (jwtUtil.isAdmin()) {
                categoryOptionsDao.deleteById(id);
                return Bp3fUtils.getResponseEntity("Category Deleted Successfully", HttpStatus.OK);
            } else {
                return Bp3fUtils.getResponseEntity(Bp3fConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
