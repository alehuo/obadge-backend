package com.alehuo.obadgebackend.repository;

import com.alehuo.obadgebackend.model.EmailActivation;
import com.alehuo.obadgebackend.model.UserAccount;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailActivationRepository extends CrudRepository<EmailActivation, Long> {
    EmailActivation findByUserAccount(UserAccount userAccount);

    EmailActivation findByEmailHash(String emailHash);
}
