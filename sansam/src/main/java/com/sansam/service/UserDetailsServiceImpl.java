package com.sansam.service;

import com.sansam.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements org.springframework.security.core.userdetails.UserDetailsService {

	private final UserRepository userRepository;

	@Autowired
	public UserDetailsServiceImpl(UserRepository userRepository) {
	    this.userRepository = userRepository;
	  }

	@Override
	public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
		return userRepository.findByUserEmail(userEmail);
	}

}

