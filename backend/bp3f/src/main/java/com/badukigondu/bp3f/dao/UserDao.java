package com.badukigondu.bp3f.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import com.badukigondu.bp3f.pojo.User;
import com.badukigondu.bp3f.wrapper.UserWrapper;

import jakarta.transaction.Transactional;

public interface UserDao extends JpaRepository<User, Long> {

    User findByEmail(@Param("email") String email);

    List<UserWrapper> getAllUser();

    UserWrapper getUserByEmail(@Param("email") String email);

    @Transactional
    @Modifying
    void updateProfilePic(Long id, String imageLink);

}
