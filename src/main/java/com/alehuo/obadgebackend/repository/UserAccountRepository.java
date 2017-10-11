package com.alehuo.obadgebackend.repository;

import com.alehuo.obadgebackend.model.UserAccount;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountRepository extends CrudRepository<UserAccount, Long> {
    UserAccount findUserAccountByEmail(String email);
}
