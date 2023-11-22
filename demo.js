const myform=document.querySelector("#my-form")
let amount=document.querySelector("#amount")
let description=document.querySelector("#description")
let category=document.querySelector("#category")
const msg=document.querySelector(".msg")

myform.addEventListener("submit",add_details)

function add_details(e){
    e.preventDefault();

    if(amount.value==="" || description.value==="" || category.value===""){
        msg.classList.add('error')
        msg.innerHTML="please enter the feilds"
        setTimeout(()=>{
            msg.remove()},3000)
    }else{


        let myobj={
            eamount:amount.value,
            edesc:description.value,
            ecategory:category.value,

        }
        
        myobj_serialize=JSON.stringify(myobj);
        let primary_key=amount.value+category.value

        localStorage.setItem(primary_key,myobj_serialize);

        console.log(JSON.parse(localStorage.getItem(amount.value+category.value)).eamount)
        
        let textvalue=JSON.parse(localStorage.getItem(primary_key)).eamount+" - "+JSON.parse(localStorage.getItem(amount.value+category.value)).edesc+" - "+JSON.parse(localStorage.getItem(amount.value+category.value)).ecategory;

        let listItem=document.querySelector("#users")
        let li=document.createElement("li")
        li.classList.add("item")
        let text=document.createTextNode(textvalue)
        li.appendChild(text)

       

        let button=document.createElement("button")
        button.className=" btn-danger btn-sm float-right gy-2 delete"
        button.id="size"
        button.style.maxWidth="80px"
        button.style.maxHeight="40px"
        button.appendChild(document.createTextNode("X"))
        li.appendChild(button)

        var edit_button=document.createElement("button")
        edit_button.className=" btn-primary btn-sm float-right edit"
        edit_button.id="size_edit"
        edit_button.style.maxWidth="80px"
        edit_button.style.maxHeight="40px"
        edit_button.appendChild(document.createTextNode("edit"))
        li.appendChild(edit_button)
                
        listItem.appendChild(li)


    
    }



}

let listItem=document.querySelector("#users");
listItem.addEventListener("click",delete_edit);

function delete_edit(e){
    e.preventDefault();
    if(e.target.classList.contains("delete")){
        let li=e.target.parentElement;
        let text=li.firstChild.textContent.split(" - ")
        let primary_key=text[0]+text[2]
        console.log(text,primary_key)
        localStorage.removeItem(primary_key)
        listItem.removeChild(li)
    }else if(e.target.classList.contains("edit")){
        let li=e.target.parentElement;
        let text=li.firstChild.textContent.split(" - ")
        let primary_key=text[0]+text[2]
        amount.value=text[0]
        description.value=text[1]
        category.value=text[2]
        localStorage.removeItem(primary_key)
        listItem.removeChild(li)
    }
}
