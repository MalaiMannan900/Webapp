package com.webapp.app.userdesignation;

public class ForgotPasswordBean {

	private String userName; 
	private String oldChangepassword; 
	private String newChangePassword; 
	private String confirmChangePassword;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getOldChangepassword() {
		return oldChangepassword;
	}
	public void setOldChangepassword(String oldChangepassword) {
		this.oldChangepassword = oldChangepassword;
	}
	public String getNewChangePassword() {
		return newChangePassword;
	}
	public void setNewChangePassword(String newChangePassword) {
		this.newChangePassword = newChangePassword;
	}
	public String getConfirmChangePassword() {
		return confirmChangePassword;
	}
	public void setConfirmChangePassword(String confirmChangePassword) {
		this.confirmChangePassword = confirmChangePassword;
	}
	
}
