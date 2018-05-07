package com.dcits.ms.repository;


import com.dcits.ms.model.Project;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {


    @Query(value = "select * from ms_project t order by create_date desc limit 0,?", nativeQuery = true)
    List<Project> findByNum(Integer maxNum);



    @Query(value = "select t from Project t where createDate > ? ")
    List<Project> findProjectsByCreateDate(Date createDate);



}
