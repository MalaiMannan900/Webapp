
package com.webapp.app.userdesignation;


import org.springframework.stereotype.Service;

@Service
public interface UserdesignationDao {

	UserdesignationResultBean save(UserdesignationBean bean);

	UserdesignationResultBean edit(String id);

	UserdesignationResultBean delete(String code);

	UserdesignationResultBean getList();

	UserdesignationResultBean update(UserdesignationBean bean);

	UserdesignationBean findByUsername(String empid);
	
	UserdesignationBean getSequenceCode();

	
	}
