{
    "name": "Hospital Management System",
    "license": "LGPL-3",
    "summary": "Manage hospital operations efficiently",
    "author": "Hamza Ahmed",
    "depends" : [
        'base',
        'mail','product'
    ],
    "data": [
        "security/ir.model.access.csv",
        "data/sequence.xml",
        "views/patient_views.xml",
        "views/patient_readonly_views.xml",
        "views/appointment_views.xml",
        "views/patient_tag_views.xml",   
        "views/menu.xml",
        
    ],
    
    "assets": {
        'web.assets_backend': [
            'om_hospital/static/src/components/ListView/listView.css',
            'om_hospital/static/src/components/ListView/listView.js',
            'om_hospital/static/src/components/ListView/listView.xml',
        ],

    }



}   