# similar to res.partner create model for hospital


from odoo import api, fields, models

class PatientTag(models.Model):
    
    _name= 'patient.tag'
    _description= 'Patient Tag'
    _order = 'sequence,id'
# up till now this will create the table in the database


    name = fields.Char(string="Name", required=True)

    sequence = fields.Integer(default=10)




