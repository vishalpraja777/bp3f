# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Done
- Signup
- Login
- Get All Users
- Add Campaign
- Get All Campaign
- Get Campaign by id
- Add Donation
- Get All Donation
- Images table
- Campaign Detail Page
- Category in campaign
- Profile page
- Update Profile
- Update Campaign

# TODO
- Form validations for: Sign up, Login, Create Campaign, Donate -D
- In campaign creation make category as dropdown -D
- Is Anonymous in donate -D
- Added user after payment
- Callback for payment
- Loading Animation
- Progress bar -D

- Onclick Image full view -D

- Withdraw amount list in view campaign page -D
- Long Description -D
- Admin Add category fom database -D
- Razorpay Page 

- AdminPanel

- Database:
- Category - id, category, status -D -iP
- Commission option -D -iP
- All Constants -D -iP
- Withdrawal Approval - id, userId, campaignId, approvedDate, amount, approvedStatus -D -iP

- ALTER TABLE your_table MODIFY your_column TEXT;
- alter table website_constants modify value_column text;

# S3
- Add the following properties in application.properties file:
- - amazonProperties.endpointUrl
- - amazonProperties.accessKey
- - amazonProperties.secretKey
- - amazonProperties.bucketName
- Create the AmazonClient.java file


# Razor pay
- Generate key
- Make the service class


# ec2 Instance:
- Create new ec2 instance
- Connect using gitbash by opening it in the folder in which the pem key is present

- url to connect: ssh -i "bp3f_instance_key.pem" ubuntu@ec2-3-109-122-175.ap-south-1.compute.amazonaws.com

# Installing tomcat on ec2 ubuntu instance: 
- https://tecadmin.net/how-to-install-tomcat-on-ubuntu-22-04/
-https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-10-on-ubuntu-20-04
- Add Elastic IP addresses -> Associate it with the ec2 instance

- http://13.235.185.164:8080/

- S3 bucket
- ec2 instance
- Target group
- Load balancer

# Installing mysql on ubuntu:
- apt-get update
- apt-get install mysql-server
- mysql_secure_installation
- create user 'vp'@'%' identified by 'admin@123'
- grant all priviliges on *.* to 'vp'@'%';
- mysql -u vp -p

- java -jar bp3f.jar

# To make the Springboot Application as a backend service:
- Add  <executable>true</executable> in plugin in pom.xml
- Service script
[Unit]
Description=BP3F backend service
After=syslog.target

[Service]
User=ubuntu
ExecStart=/home/ubuntu/bp3f/bp3f.jar
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target

- To start service
- in /etc/systemd/system
- - systemctl enable bp3f
- - systemctl start bp3f
- - systemctl stop bp3f
- - systemctl restart bp3f
- - systemctl status bp3f

# React App on ec2
- https://medium.com/@rizkiprass/step-by-step-guide-deploying-a-react-app-on-aws-ec2-b2965af05aa4