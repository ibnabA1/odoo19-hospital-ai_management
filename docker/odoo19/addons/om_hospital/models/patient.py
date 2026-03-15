# similar to res.partner create model for hospital

from odoo import api, fields, models

class HospitalPatient(models.Model):
    
    _name= 'hospital.patient'
    #mail.therad class define in mail module of odoo, add dependncy of mail module in manifest.py
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _description= 'Patient Master'
# up till now this will create the table in the database


    name = fields.Char(string="Name", required=True, tracking=True)
    date_of_birth = fields.Date(string="DOB", tracking=True)
    gender= fields.Selection([('male','Male'),('female', 'Female')], string="Gender", tracking=True)

#hold multiple values of patient tag for each patient, this will create a many2many relation between patient and patient tag, this will allow us to assign multiple tags to a patient and also assign same tag to multiple patients, this will create a new table in the database with the name hospital_patient_patient_tag_rel with two columns hospital_patient_id and patient_tag_id which will hold the ids of the patient and patient tag respectively
    tag_ids = fields.Many2many('patient.tag', 'patient_tag_rel', 'patient_id', 'patient_tag_id', string="Tags", tracking=True)

    product_ids = fields.Many2many('product.product', string="Products", tracking=True)







              
          

    


