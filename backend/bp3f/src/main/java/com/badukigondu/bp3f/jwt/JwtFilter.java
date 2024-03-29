package com.badukigondu.bp3f.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomerUserDetailsService service;

    Claims claims = null;
    private String userName = null;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

                if(request.getServletPath().matches("/user/login|/user/signup|/campaign/getAll|/campaign/get/[0-9]*|/usersDonated/add|/payment/payCampaign/[0-9]*|/image/uplaodImage|/usersDonated/getByCampaignId/[0-9]*|/campaignImages/getImageByCampaignId/[0-9]*|/user/test|/campaignCategory/getAll|/commission/getAll|/websiteConstants/getByKey/Privacy_Policy")){
                    filterChain.doFilter(request, response);    
                } else{
                    String authorizationHeader = request.getHeader("Authorization");
                    String token = null;

                    if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
                        token = authorizationHeader.substring(7);
                        userName = jwtUtil.extractUserName(token);
                    }

                    if(userName != null && SecurityContextHolder.getContext().getAuthentication() == null){
                        UserDetails userDetails = service.loadUserByUsername(userName);
                        if(jwtUtil.validateToken(token, userDetails)){
                            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = 
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                            usernamePasswordAuthenticationToken.setDetails(
                                new WebAuthenticationDetailsSource().buildDetails(request)
                            );
                            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                        }
                    }
                    filterChain.doFilter(request, response); 
                }

    }

}
