package com.dcits.ms.repository;


import com.dcits.ms.model.Project;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {


    @Query(value = "select t from ms_project t limit 0,?", nativeQuery = true)
    List<Project> findByNum(Integer maxNum);

}
