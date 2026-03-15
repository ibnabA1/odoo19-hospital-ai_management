

/* @odoo-module */


import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { rpc } from "@web/core/network/rpc";


export class ListViewAction extends Component { 
    static template = "list_view_template";

    setup(){

        // useState contains all the data which we have to use in our component 
        this.state = useState({
            'records':[],
            'showForm': false,
            'form':{
                'id': null,
                'name': '',
                'date_of_birth': '',
                'gender': '',
            },


            

        });
        this.orm = useService("orm");
        this.loadRecords();

    }



    // async loadRecords(){
    //     const result= await this.orm.searchRead("hospital.patient",[],[]);
    //     console.log(result);
    //     this.state.records = result;

    // }


    async loadRecords(){
        //instead of calling search using orm we will call it using RPC

        // first mention that rpc is define in setup()
        // we use this rpc endpoint to call any method inside our model
        // we call method searchRead which is inside the model Search_read of odoo built in model
        // the second parameter is dictonory which contains 4 important information model name, method which will be called, args which contains domain name and kwargs which comtains the field of the model from which we require data
        const result = await rpc("/web/dataset/call_kw",{
            model: "hospital.patient",
            method: "search_read",
            args:[[]],
            kwargs:{fields: ['id','name','date_of_birth','gender']},


        });
        console.log(result);
        this.state.records= result;


    }

    // DELETE RECORD

    async deleteRecord(id) {
    if (!confirm("Are you sure you want to delete this patient?")) return;

    try {
        await rpc("/web/dataset/call_kw", {
            model: "hospital.patient",
            method: "unlink",
            args: [[id]],  // patient ID to delete
            kwargs: {},
        });

        await this.loadRecords();  // refresh table
        alert("Patient and their appointments deleted successfully!");
    } catch (err) {
        alert("Error deleting patient: " + err.message);
    }

    }



    showCreateForm() {
    this.state.form = { name: '', date_of_birth: '', gender: '' }; // reset form
    this.state.showForm = true;  // display popup
    }


    editRecord(record){
        this.state.form ={
            id: record.id,
            name: record.name,
            date_of_birth: record.date_of_birth,
            gender: record.gender,
        };

        this.state.showForm = true;
    }













    // SAVE RECORD (USED IN BOTH CREATE AND EDIT FUNCTION)
    async saveRecord() {

        console.log("save button is clicked")
        
        const { id, name, date_of_birth, gender } = this.state.form;

        if (!name) {
            alert("Name is required");
            return;
        }

        if(id){

                // UPDATE

            await rpc("/web/dataset/call_kw", {
                model: "hospital.patient",
                method: "write",
                args: [[id], {
                    name: name,
                    date_of_birth: date_of_birth,
                    gender: gender
                    }],

                    kwargs: {},
                });


            }
            else{

                await rpc("/web/dataset/call_kw", {
                    model: "hospital.patient",
                    method: "create",
                    args: [{ name, date_of_birth, gender 

                        }],
            kwargs: {},
        });

       

        }

        this.state.showForm = false;  // hide form
        await this.loadRecords();  

        this.state.form = {
            id: null,
            name: '',
            date_of_birth: '',
            gender: '',
        };


    

    // refresh table
}




    





};


// +++++++++++++++HOW TO LOAD RECORD USING RPC+++++++++++++++++++++++++++
// It is also called action call, its an endpoint thorugh which we call
// we will call the method
// its diffreernt from http as http is mostly used for curd operations read write create update delete 

// what we do is in our project to call a method using an RPC endpoint

registry.category("actions").add("list_view_action", ListViewAction);