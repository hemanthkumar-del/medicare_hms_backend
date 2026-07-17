# AWS EC2 Infrastructure Deployment Guide

This guide walks through setting up an AWS EC2 instance to deploy the containerized FastCure backend.

---

## 1. AWS EC2 Instance Creation
1. Sign in to the [AWS Management Console](https://console.aws.aws.com).
2. Navigate to the **EC2 Dashboard** and click **Launch Instance**.
3. **Application and OS Images (AMI)**: Choose **Ubuntu Server 22.04 LTS (HVM), SSD Volume Type** (64-bit x86).
4. **Instance Type**: Select a minimum of **t3.micro** (free tier eligible) or **t3.small** depending on the expected traffic.
5. **Key Pair**: Create a new key pair (RSA, `.pem`) and download it. Store it securely (e.g., `chmod 400 yourkey.pem`).
6. **Network Settings**: Configure a Security Group (see Firewall section below).

---

## 2. Firewall Configuration (Security Groups)
Configure the following inbound rules on your EC2 Security Group:

| Type | Protocol | Port Range | Source | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **SSH** | TCP | `22` | `My IP` (Recommended) or `0.0.0.0/0` | Secure remote server access |
| **HTTP** | TCP | `80` | `0.0.0.0/0` | Nginx reverse proxy requests |
| **HTTPS** | TCP | `443` | `0.0.0.0/0` | Encrypted SSL exchanges |

---

## 3. Ubuntu Server Preparation
Connect to your EC2 instance via SSH:
```bash
ssh -i "yourkey.pem" ubuntu@your-ec2-public-ip
```
Update local system package repositories:
```bash
sudo apt update && sudo apt upgrade -y
```
Install necessary utility dependencies:
```bash
sudo apt install -y curl git software-properties-common fail2ban
```

---

## 4. Backup Strategy
To prevent data loss on the live MongoDB volume:
1. **AWS EBS Snapshots**: Set up an automated daily snapshot lifecycle policy (Lifecycle Manager) for the EC2 block storage volume.
2. **Database Dumps**: Schedule a cron job inside the container to backup data to AWS S3 daily:
   ```bash
   docker exec fastcure-mongodb mongodump --archive --gzip > backup.gz
   ```

---

## 5. Rollback Strategy
If a deployment fails:
1. Stop the failing container build:
   ```bash
   docker compose down
   ```
2. Revert the git repository state to the last verified release tag:
   ```bash
   git checkout tags/v2.0.0
   ```
3. Rebuild and launch the fallback container:
   ```bash
   docker compose up --build -d
   ```
