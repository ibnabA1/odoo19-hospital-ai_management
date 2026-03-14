# Module Features

This document explains the technical features implemented in the **Hospital Management System Odoo module**.

The module demonstrates backend modeling, view customization, frontend OWL development, and AI integration within the Odoo ecosystem.

## Patient Model

File:

models/patient.py

This model represents the core patient entity in the hospital system.

### Fields

Name  
Char field representing the patient name.

Date of Birth  
Date field storing the patient birth date.

Gender  
Selection field:

male  
female

### Many2many Relationships

Patient Tags

A Many2many relationship allows assigning multiple tags to a patient.

Example use cases:

VIP patient  
Emergency case  
Regular checkup

Products

Patients can also be associated with multiple products using a Many2many relationship.

This demonstrates integration with the existing Odoo product model.

## Patient Tag Model

File:

models/patient_tag.py

This model is used to categorize patients.

### Fields

Name  
Char field representing the tag name.

Sequence  
Integer field used to control ordering of tags.

### View

Tags are managed using an editable list view with drag-and-drop sequence control.

## Appointment Model

File:

models/appointment.py

This model manages hospital appointments.

### Fields

Reference  
Char field storing unique appointment reference.

Patient  
Many2one relationship to the patient model.

Date  
Datetime field storing appointment time.

Note  
Text field used by doctors to record symptoms or medical notes.

AI Response  
Text field storing AI-generated medical insights.


## Appointment Workflow

Appointments follow a lifecycle controlled using a Selection field.

States:

Draft  
Confirmed  
Ongoing  
Done  
Cancelled

The workflow is controlled using action buttons in the form view.

Buttons trigger Python methods to update the state of the appointment.

The statusbar widget visually represents the current state.

## Sequence Generation

Appointment references are generated automatically using an Odoo sequence.

File:

data/sequence.xml

Example reference values:

HP00001  
HP00002  
HP00003

The sequence ensures each appointment has a unique identifier.

## Security Configuration

Access rules are defined in:

security/ir.model.access.csv

Permissions are configured for:

Patient model  
Appointment model  
Patient Tag model

These rules control which users can read, create, update, or delete records.


## XML Views

The module defines several views:

Patient Form View  
Patient Tree View  
Readonly Patient View  
Appointment Form View  
Appointment Tree View  
Patient Tag Tree View

Views are defined inside the views directory.

The module also includes menu configuration for easy navigation inside the Odoo interface.

## Custom OWL List View

A custom patient list view was implemented using the OWL framework.

Files:

static/src/components/ListView/

listView.js  
listView.xml  
listView.css

### Features

Load records using RPC

Create patient records

Edit existing patients

Delete patients

Popup form UI

Dynamic UI updates using reactive state

## RPC Communication

The frontend communicates with the backend using Odoo RPC.

Example endpoint:

/web/dataset/call_kw

Operations implemented using RPC:

search_read  
create  
write  
unlink

This allows the OWL frontend component to perform CRUD operations on patient records.


## AI Integration

Appointment notes can be analyzed using Gemini AI.

Workflow:

Doctor writes note  
User clicks "Ask AI"  
System sends note to Gemini API  
AI response is returned and stored in the appointment record

This feature demonstrates integration between Odoo backend and external AI services.
