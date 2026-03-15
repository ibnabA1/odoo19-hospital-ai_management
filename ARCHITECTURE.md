# System Architecture

This document explains the architecture of the **Hospital Management System module built on Odoo 19**.

The system combines Odoo backend models, XML views, custom OWL frontend components, RPC communication, PostgreSQL database storage, and AI integration using Gemini.

---

# High Level Architecture

The overall architecture of the system is illustrated below.

```
User Interface (OWL Components)
        │
        ▼
RPC Communication Layer
        │
        ▼
Odoo ORM (Python Backend Models)
        │
        ▼
PostgreSQL Database
        │
        ▼
External AI Service (Gemini API)
```

Each layer is responsible for a specific part of the system.

---

# 1. Frontend Layer (OWL Components)

The frontend layer is responsible for rendering the user interface and handling user interactions.

This project includes a **custom OWL List View** implemented inside the module.

Location:

```
static/src/components/ListView/
```

Files:

```
listView.js
listView.xml
listView.css
```

## Responsibilities

The OWL component performs the following tasks:

- Display patient records in a custom table
- Handle user interactions (Create, Edit, Delete)
- Manage UI state using `useState`
- Open popup forms for record editing
- Trigger RPC calls to the backend

Example state structure used in the component:

```javascript
this.state = useState({
    records: [],
    showForm: false,
    form: {
        id: null,
        name: "",
        date_of_birth: "",
        gender: ""
    }
});
```

OWL automatically updates the UI whenever the state changes.

---

# 2. RPC Communication Layer

The OWL frontend communicates with the Odoo backend using the RPC endpoint:

```
/web/dataset/call_kw
```

RPC is used to execute model methods remotely from the frontend.

Example RPC request:

```javascript
await rpc("/web/dataset/call_kw", {
    model: "hospital.patient",
    method: "search_read",
    args: [[]],
    kwargs: {
        fields: ["id", "name", "date_of_birth", "gender"]
    }
});
```

RPC operations implemented in this project include:

- `search_read` → Load records
- `create` → Create new patient
- `write` → Update existing patient
- `unlink` → Delete patient records

This enables full CRUD functionality in the custom OWL interface.

---

# 3. Backend Layer (Odoo ORM)

The backend layer contains the business logic implemented using the Odoo ORM.

Location:

```
models/
```

Models implemented:

```
patient.py
appointment.py
patient_tag.py
```

## Patient Model

Handles core patient information.

Fields include:

- name
- date_of_birth
- gender
- tag_ids (Many2many relationship)
- product_ids (Many2many relationship)

---

## Appointment Model

Handles appointment scheduling and workflow.

Fields include:

- reference
- patient_id (Many2one)
- date_appointment
- note
- ai_response
- state (workflow status)

Appointment lifecycle states:

```
draft → confirmed → ongoing → done → cancel
```

These states are displayed using the **statusbar widget**.

---

## Patient Tag Model

Used for classifying patients.

Fields include:

- name
- sequence

Tags can be reordered using drag-and-drop in the tree view.

---

# 4. Database Layer (PostgreSQL)

Odoo uses **PostgreSQL** as the database engine.

Each model corresponds to a database table.

Example:

| Model | Database Table |
|------|----------------|
| hospital.patient | hospital_patient |
| hospital.appointment | hospital_appointment |
| patient.tag | patient_tag |

Relationships are stored using foreign keys and relation tables.

Example Many2many relation:

```
patient_tag_rel
```

---

# 5. XML View Layer

The UI inside Odoo is defined using XML views.

Location:

```
views/
```

Views implemented:

- Patient Form View
- Patient Tree View
- Readonly Patient View
- Appointment Form View
- Appointment Tree View
- Patient Tag Tree View

These views control how records are displayed and edited in the Odoo interface.

---

# 6. Sequence Generation

Appointments automatically generate unique references using Odoo sequences.

Defined in:

```
data/sequence.xml
```

Example generated values:

```
HP00001
HP00002
HP00003
```

Sequences ensure that every appointment has a unique identifier.

---

# 7. AI Integration (Gemini)

The system integrates with **Gemini AI** to analyze appointment notes.

Workflow:

```
Doctor enters symptoms in appointment note
        │
        ▼
User clicks "Ask AI"
        │
        ▼
Odoo sends note to Gemini API
        │
        ▼
Gemini generates medical recommendation
        │
        ▼
Response stored in ai_response field
```

Example prompt structure:

```
Act as a professional doctor.

Patient Symptoms:
<appointment note>

Provide diagnosis and treatment recommendations.
```

This demonstrates integration between Odoo backend and external AI services.

---

# 8. Security Layer

Security access rules are defined in:

```
security/ir.model.access.csv
```

Permissions are configured for:

- hospital.patient
- hospital.appointment
- patient.tag

These rules control which users can:

- read records
- create records
- update records
- delete records

---

# Architecture Summary

The system architecture combines several layers of the Odoo ecosystem:

```
OWL UI (Frontend)
      │
      ▼
RPC Layer
      │
      ▼
Odoo ORM (Backend Models)
      │
      ▼
PostgreSQL Database
      │
      ▼
External AI Service (Gemini)
```

This layered architecture allows the system to remain modular, scalable, and aligned with modern Odoo development practices.
