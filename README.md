# Hospital Management System (Odoo 19)

A custom Hospital Management module built on **Odoo 19**, implementing patient management, appointment workflows, custom OWL frontend components, and AI-powered appointment analysis using **Gemini AI**.

This project demonstrates full-stack Odoo development including:

- Backend business logic with Python ORM
- XML view development
- Security access rules
- Sequence generation
- Custom OWL frontend components
- RPC communication between frontend and backend
- AI integration using Gemini API


## System Overview

This project implements a hospital management module with the following main components:

- **Patient Management**
- **Appointment Management**
- **Patient Tags Classification**
- **Custom OWL List View**
- **AI-assisted appointment analysis**
- **Workflow state management**
- **Chatter integration for communication tracking**

The module is developed as a standard **Odoo addon** and follows Odoo's recommended architecture.


## Project Structure

odoo19-hospital-management/
│
├── README.md
├── INSTALLATION.md
├── ARCHITECTURE.md
├── FEATURES.md
├── DEVELOPMENT_CHALLENGES.md
│
├── docker/
│
├── screenshots/
│
└── om_hospital/
    ├── __manifest__.py
    ├── __init__.py
    │
    ├── models/
    │   ├── patient.py
    │   ├── appointment.py
    │   └── patient_tag.py
    │
    ├── views/
    │   ├── patient_views.xml
    │   ├── appointment_views.xml
    │   ├── patient_tag_views.xml
    │   ├── patient_readonly_views.xml
    │   └── menu.xml
    │
    ├── security/
    │   └── ir.model.access.csv
    │
    ├── data/
    │   └── sequence.xml
    │
    └── static/src/components/ListView/
        ├── listView.js
        ├── listView.xml
        └── listView.css


## Key Features

### Patient Management
- Patient registration
- Date of birth and gender tracking
- Tag classification using Many2many relationship
- Product associations
- Chatter activity tracking

### Appointment Management
- Appointment scheduling
- Patient appointment relationship
- Workflow status management
- Appointment notes

### Appointment Workflow
Appointments follow a lifecycle:

Draft → Confirmed → Ongoing → Done → Cancelled

Implemented using **Selection fields and statusbar widget**.

### AI-assisted Appointment Analysis
Appointment notes can be sent to **Gemini AI** for medical insight generation.

The system sends the note to the Gemini API and stores the AI response inside the appointment record.

### Custom OWL List View
A fully custom list view built using **OWL components** instead of default Odoo tree views.

Features:
- RPC-based data loading
- CRUD operations
- Reactive state management
- Dynamic UI updates


## Custom OWL Frontend

A custom list view was built using **Odoo OWL framework**.

Files:

static/src/components/ListView/
    listView.js
    listView.xml
    listView.css



### Frontend Architecture

The OWL component manages reactive state using `useState`.

state = {
  records: [],
  showForm: false,
  form: {...}
}

Whenever `state.records` changes, the UI automatically re-renders.

Data communication with the backend is handled through the Odoo RPC endpoint:

/web/dataset/call_kw





## AI Integration (Gemini)

The system integrates **Gemini AI** to analyze appointment notes.

Workflow:

1. Doctor writes appointment note
2. Note is sent to Gemini API
3. Gemini generates medical insight
4. Response is stored in the appointment record

The integration is implemented using Python requests.






## Data Model Relationships

Patient → Appointment  
One patient can have multiple appointments.

Patient → Patient Tags  
Many2many relationship for classification.

Patient → Products  
Many2many relationship with product catalog.





## Technologies Used

- Odoo 19
- Python
- PostgreSQL
- OWL (Odoo Web Library)
- JavaScript
- XML
- Gemini AI API





## Screenshots

Screenshots demonstrating the system functionality will be added in the `screenshots` folder.

