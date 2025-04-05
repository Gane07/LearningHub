package com.model;

public class LoginRequest {

    private String email;
    private String password;
    private String userName;

    public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	// Getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email= email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Constructors
    public LoginRequest() {
    }

	public LoginRequest(String email, String password, String userName) {
		super();
		this.email = email;
		this.password = password;
		this.userName = userName;
	}

}
