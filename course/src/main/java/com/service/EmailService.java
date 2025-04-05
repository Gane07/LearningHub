package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
	private final JavaMailSender mailSender;
	@Value("${spring.mail.username}")
	private String senderEmail;

	@Autowired
	public EmailService(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}

	public void sendEmail(String to, String subject, String body) {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		try {
			helper.setTo(to);
			helper.setSubject(subject);
			helper.setText(body, true);
			helper.setFrom("suddalaganesh1239@gamil.com");
			mailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
			throw new RuntimeException("Error while sending email: " + e.getMessage());
		}
	}
}
