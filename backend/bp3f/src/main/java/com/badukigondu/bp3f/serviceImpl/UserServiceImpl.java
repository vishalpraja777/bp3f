package com.badukigondu.bp3f.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.dao.UserDao;
import com.badukigondu.bp3f.jwt.CustomerUserDetailsService;
import com.badukigondu.bp3f.jwt.JwtUtil;
import com.badukigondu.bp3f.pojo.User;
import com.badukigondu.bp3f.service.UserService;
import com.badukigondu.bp3f.utils.Bp3fUtils;
import com.badukigondu.bp3f.wrapper.UserWrapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserDao userDao;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	CustomerUserDetailsService customerUserDetailsService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtUtil jwtUtil;

	@Override
	public ResponseEntity<String> signUp(Map<String, String> requestMap) {

		log.info("Inside signUp {}", requestMap);

		try {

			if (validateSignUpMap(requestMap)) {
				User user = userDao.findByEmail(requestMap.get("email"));
				if (Objects.isNull(user)) {
					userDao.save(getUserFromMap(requestMap));
					return Bp3fUtils.getResponseEntity("Successfully Registered", HttpStatus.CREATED);
				} else {
					return Bp3fUtils.getResponseEntity("User already exists", HttpStatus.BAD_REQUEST);
				}
			} else {
				return Bp3fUtils.getResponseEntity(Bp3fConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	private boolean validateSignUpMap(Map<String, String> requestMap) {
		if (requestMap.containsKey("name") && requestMap.containsKey("mobileNumber")
				&& requestMap.containsKey("email") && requestMap.containsKey("password")) {
			return true;
		}
		return false;
	}

	private User getUserFromMap(Map<String, String> requestMap) {

		// BankDetails bankDetails = new BankDetails();

		User user = new User();
		user.setName(requestMap.get("name"));
		user.setEmail(requestMap.get("email"));
		user.setMobileNumber(requestMap.get("mobileNumber"));
		user.setAadharCard(requestMap.get("aadharCard"));
		user.setPanCard(requestMap.get("panCard"));
		user.setGender(requestMap.get("gender"));

		// user.setProfilePic(requestMap.get("profilePic"));

		if (!requestMap.get("profilePic").equalsIgnoreCase("")) {
			user.setProfilePic(requestMap.get("profilePic"));
		} else {
			String defaultImageUrl = "https://bp3f-bucket.s3.ap-south-1.amazonaws.com/CampaignImages/profilePic.png";
			user.setProfilePic(defaultImageUrl);
		}

		user.setPassword(passwordEncoder.encode(requestMap.get("password")));
		// user.setStatus("false");
		user.setRole("user");
		user.setStatus(Bp3fConstants.ACTIVE);

		user.setAccountNumber(requestMap.get("accountNumber"));
		user.setBankName(requestMap.get("bankName"));
		user.setHolderName(requestMap.get("holderName"));
		user.setIfscCode(requestMap.get("ifscCode"));
		// user.setBankDetails(bankDetails);

		return user;

	}

	@Override
	public ResponseEntity<String> login(Map<String, String> requestMap) {
		log.info("Inside Login");
		try {

			UserDetails userDetails = customerUserDetailsService.loadUserByUsername(requestMap.get("email"));

			Authentication auth = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(requestMap.get("email"), requestMap.get("password")));

			if (auth.isAuthenticated()) {
				// Can also add admin approval
				return new ResponseEntity<String>("{\"token\":\""
						+ jwtUtil.generateToken(customerUserDetailsService.getUserDetails().getEmail(),
								customerUserDetailsService.getUserDetails().getRole())
						+ "\"}",
						HttpStatus.OK);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return Bp3fUtils.getResponseEntity("Bad Credentials.", HttpStatus.BAD_REQUEST);

	}

	@Override
	public ResponseEntity<List<UserWrapper>> getAllUser() {
		try {
			if (jwtUtil.isAdmin()) {
				return new ResponseEntity<List<UserWrapper>>(userDao.getAllUser(), HttpStatus.OK);
			} else {
				return new ResponseEntity<List<UserWrapper>>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<UserWrapper> getUserByEmail(String email) {
		try {
			return new ResponseEntity<UserWrapper>(userDao.getUserByEmail(email), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new UserWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<String> updateInfo(Long id, Map<String, String> requestMap) {
		try {

			if (id != userDao.findByEmail(jwtUtil.getUserEmail()).getId() && !jwtUtil.isAdmin()) {
				log.info("Not Same User");
				return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG,
						HttpStatus.INTERNAL_SERVER_ERROR);
			}

			if (validateRequestMap(requestMap)) {
				User user = userDao.findById(id).get();

				user.setName(requestMap.get("name"));
				user.setEmail(requestMap.get("email"));
				user.setGender(requestMap.get("gender"));
				user.setMobileNumber(requestMap.get("mobileNumber"));
				user.setPanCard(requestMap.get("panCard"));
				user.setAadharCard(requestMap.get("aadharCard"));
				user.setHolderName(requestMap.get("holderName"));
				user.setBankName(requestMap.get("bankName"));
				user.setAccountNumber(requestMap.get("accountNumber"));
				user.setIfscCode(requestMap.get("ifscCode"));

				userDao.save(user);

				return Bp3fUtils.getResponseEntity("Successfully Updated", HttpStatus.OK);
			} else {
				return Bp3fUtils.getResponseEntity(Bp3fConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
			}
		} catch (

		Exception e) {
			e.printStackTrace();
		}
		return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	private boolean validateRequestMap(Map<String, String> requestMap) {
		if (requestMap.containsKey("name") && requestMap.containsKey("mobileNumber")
				&& requestMap.containsKey("email")) {
			return true;
		}
		return false;
	}

	@Override
	public ResponseEntity<String> updateProfilePic(Long id, Map<String, String> requestMap) {
		try {

			if (id != userDao.findByEmail(jwtUtil.getUserEmail()).getId() && !jwtUtil.isAdmin()) {
				log.info("Not Same User");
				return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG,
						HttpStatus.INTERNAL_SERVER_ERROR);
			}

			if (requestMap.containsKey("imageLink")) {
				userDao.updateProfilePic(id, requestMap.get("imageLink"));
				return Bp3fUtils.getResponseEntity("Profile Pic Updated", HttpStatus.OK);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<String> updateStatus(Long id, Map<String, String> requestMap) {
        try {

			if(jwtUtil.isAdmin()){
				
				User user = userDao.findById(id).get();

				if(Boolean.parseBoolean(requestMap.get("status")) == true){
					user.setStatus(Bp3fConstants.ACTIVE);
				} else if(Boolean.parseBoolean(requestMap.get("status")) == false){
					user.setStatus(Bp3fConstants.DEACTIVE);
				}
				userDao.save(user);
				return Bp3fUtils.getResponseEntity("Status Changed Successfully", HttpStatus.OK);
			} else{
				return Bp3fUtils.getResponseEntity(Bp3fConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
			}

        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<UserWrapper> findById(Long id) {
		try {

			User user = userDao.findById(id).get();

			UserWrapper userWrapper = new UserWrapper(user.getId(), user.getName(), user.getGender(), user.getMobileNumber(), user.getProfilePic(), user.getEmail(), user.getPanCard(), user.getAadharCard(), user.getRole(), user.getStatus(), user.getBankName(), user.getHolderName(), user.getAccountNumber(), user.getIfscCode());

			return new ResponseEntity<>(userWrapper, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new UserWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
