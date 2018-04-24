package com.dcits.ms.repository;


import org.springframework.data.repository.CrudRepository;

import com.dcits.ms.model.User;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsername(String username);

}
