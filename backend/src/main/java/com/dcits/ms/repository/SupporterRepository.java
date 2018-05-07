package com.dcits.ms.repository;


import com.dcits.ms.model.Project;
import com.dcits.ms.model.Supporter;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.access.method.P;

import java.util.Date;
import java.util.List;

public interface SupporterRepository extends CrudRepository<Supporter, Integer> {


    @Query(value = "select t from Supporter t where project = ?")
    List<Supporter> findSupporterByProject(Project project);


}