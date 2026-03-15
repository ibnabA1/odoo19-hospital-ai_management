# Installation Guide

This document explains how to set up and run the **Hospital Management System module for Odoo 19**.

The module is designed to run inside an **Odoo 19 environment with PostgreSQL**.

---

# Requirements

Before running the project, ensure the following dependencies are installed:

- Python 3.10+
- PostgreSQL
- Odoo 19
- pip
- Git

Optional (recommended):

- Docker
- Docker Compose

---

# 1. Clone the Repository

Clone the GitHub repository to your local machine.

```bash
git clone https://github.com/<your-username>/odoo19-hospital-management.git
```

Move into the project directory.

```bash
cd odoo19-hospital-management
```

---

# 2. Add the Module to Odoo Addons Path

Copy the `om_hospital` module into your Odoo addons directory.

Example structure:

```
odoo/
│
├── addons/
│   └── om_hospital/
│
└── odoo-bin
```

Alternatively, add the project directory to your **addons_path** inside the Odoo configuration file.

Example:

```
addons_path = /path/to/odoo/addons,/path/to/odoo19-hospital-management
```

---

# 3. Start the Odoo Server

Run the Odoo server using the following command.

```bash
python odoo-bin
```

Or if using a configuration file:

```bash
python odoo-bin -c odoo.conf
```

---

# 4. Install the Module

Open the Odoo web interface.

```
http://localhost:8069
```

Then:

1. Go to **Apps**
2. Enable **Developer Mode**
3. Click **Update Apps List**
4. Search for:

```
Hospital Management System
```

5. Click **Install**

---

# 5. Access the Module

After installation, the module will appear in the main menu.

You will be able to access:

- Patients
- Appointments
- Patient Tags

---

# 6. Test the System

Example workflow:

1. Create a new **Patient**
2. Add **Tags** to classify the patient
3. Create an **Appointment**
4. Add symptoms in the **Note field**
5. Click **Ask AI** to generate recommendations using Gemini

---

# 7. OWL Custom List View

The project also includes a **custom OWL list view** for managing patients.

This interface supports:

- Create patient records
- Edit patient records
- Delete patient records
- Dynamic UI updates using reactive state
- RPC-based communication with the backend

---

# 8. Database Setup

Odoo automatically creates the required database tables during module installation.

Main tables created:

```
hospital_patient
hospital_appointment
patient_tag
```

Relationships are automatically managed through Odoo ORM.

---

# 9. Optional: Running with Docker

A Docker setup can also be used to run the system with Odoo and PostgreSQL containers.

Example services:

- Odoo 19 container
- PostgreSQL container

Docker configuration files can be placed inside the `docker/` directory.

---

# Installation Summary

Steps to run the system:

1. Clone the repository
2. Add the module to the Odoo addons path
3. Start the Odoo server
4. Install the module from Apps
5. Begin using the hospital management system
