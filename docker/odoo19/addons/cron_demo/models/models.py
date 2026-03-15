from odoo import models, fields

class CustomRecord(models.Model):
    _name= 'custom.record'
    _description= 'Custom Record'

    name = fields.Char(string= 'Record Name', required= True)
    status = fields.Selection([('draft', 'Draft'),('completed','Completed')], default= 'draft')
    