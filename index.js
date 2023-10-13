document.getElementById("submit-button").onclick = (event) => handleSubmit(event)

function handleFormData(formDataObject) {
    const table = document.querySelector(".formtable");
    const tableData = table.querySelector("tbody");
    const tableHead = table.querySelector("thead");

    const tableDataRow = document.createElement("tr");

    for (const fieldName in formDataObject) {
        const fieldValue = formDataObject[fieldName];
        let fieldValueCell = document.createElement("td");

        if (fieldName === "Profile Picture") {
            const img = document.createElement("img");
            img.src = fieldValue;
            fieldValueCell.appendChild(img);
        } else if (fieldName === "Resume") {
            const iframe = document.createElement("iframe");
            iframe.src = fieldValue;
            fieldValueCell.appendChild(iframe);
        } else {
            fieldValueCell.textContent = fieldValue;
            if (fieldName === "Action") {
                const editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.addEventListener("click", function () {
                    handleEdit(this);
                });

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.addEventListener("click", function () {
                    handleDelete(this);
                });

                fieldValueCell.appendChild(editBtn);
                fieldValueCell.appendChild(deleteBtn);
            }
        }
        tableDataRow.appendChild(fieldValueCell);


    }


    tableData.appendChild(tableDataRow);

    if (!tableHead.querySelector("tr")) {
        const tableHeadRow = document.createElement("tr");

        for (const fieldName in formDataObject) {
            const fieldNameCell = document.createElement("th");
            fieldNameCell.textContent = fieldName;
            tableHeadRow.appendChild(fieldNameCell);
        }

        tableHead.appendChild(tableHeadRow);
    }
}

let imagePreviewData;
let docPreviewData;


function handleImageRead() {
    const fileInput = document.getElementById("file2");
    const imagePreview = document.querySelector(".uploadImg");

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (event) {
            imagePreviewData = event.target.result;
            imagePreview.src = imagePreviewData
        };
        reader.readAsDataURL(fileInput.files[0])
    }

}


function handleFileRead() {
    const docInput = document.getElementById("file1");
    const docPreview = document.querySelector(".uploadDoc");

    if (docInput.files && docInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (event) {
            docPreviewData = event.target.result;
            docPreview.src = docPreviewData
            docPreview.style.display = "block"
        };

        reader.readAsDataURL(docInput.files[0]);
    }
}
let editMode = false
let editingRow;

function handleEdit(button) {
    console.log("edit func")
    let row = button.closest("tr")
    editMode = true
    editingRow = button.closest("tr");

    const rowData = row.querySelectorAll("td")
    
    const fName = rowData[0].textContent
    const email = rowData[1].textContent
    const phone = rowData[2].textContent
    const country = rowData[3].textContent
    const city = rowData[4].textContent
    const pwd = rowData[5].textContent
    const relocation = rowData[6].value
    
    const docPreviewElement = rowData[7].querySelector("iframe");
    const imagePreviewElement = rowData[8].querySelector("img");
    const linkElement = rowData[10].textContent;
    

    const docPreviewData = docPreviewElement.src
    const imagePreviewData = imagePreviewElement.src
    const link = linkElement ? linkElement : '';

    const language = rowData[9].textContent

    document.querySelector("#fName").value = fName
    document.querySelector("input[name='email']").value = email
    document.querySelector("input[name='phone']").value = phone
    document.getElementById("list1").value = country
    document.querySelector("#city").value = city
    document.querySelector("#pwd").value = pwd
    document.querySelector("#cpwd").value = pwd
    document.forms.form["flag"].value = relocation
    document.querySelector(".uploadDoc").src = docPreviewData;
    document.querySelector(".uploadImg").src = imagePreviewData;
    document.getElementById("list2").value = language
    document.getElementById("link").value = link;
    

    const saveBtn = document.getElementById("submit-button")
    saveBtn.innerHTML = "Save"
    
}

function getIndexForFieldName(fieldName) {
    const fieldNames = ["Full Name", "Email", "Phone", "Country", "City", "Password", "Relocation", "Resume", "Profile Picture", "Programming Language", "Github"];
    return fieldNames.indexOf(fieldName);
}

function updateTableRow(row, data) {
    const cells = row.querySelectorAll("td");

    // Loop through the cells and update their content
    for (const fieldName in data) {
        if (fieldName === "Profile Picture") {
            const img = cells[8].querySelector("img");
            img.src = data[fieldName];
        } else if (fieldName === "Resume") {
            const iframe = cells[7].querySelector("iframe");
            iframe.src = data[fieldName];
        } else if (fieldName === "Action") {
            // Handle the "Action" cell if needed
        } else {
            cells[getIndexForFieldName(fieldName)].textContent = data[fieldName];
        }
    }
}

function handleDelete(button) {
    let row = button.closest("tr")
    if (row) {
        row.remove()
    }
}




function handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("form")
    const fName = document.querySelector("#fName").value;
    const email = document.querySelector("input[name='email']").value;
    const phone = document.querySelector("input[name='phone']").value;
    const city = document.querySelector("#city").value;
    const pwd = document.querySelector("#pwd").value;
    const cpwd = document.querySelector("#cpwd").value;
    const relocation = document.forms.form["flag"].value;
    const passError = document.querySelector(".notmatch");
    const notPass = document.querySelector(".notpass");
    const file1 = document.getElementById("file1").value;
    const file2 = document.getElementById("file2").value;
    const list2 = document.getElementById("list2").value;
    const minLength = document.querySelector(".minlength");
    const link = document.getElementById("link").value;
    const chooseCountry = document.getElementById("list1").value;
    const mobError = document.querySelector(".mob-error")
    const title = document.querySelector("h4");
    const require = document.querySelectorAll(".error");

    const imagePreview = document.querySelector(".uploadImg");
    const docPreview = document.querySelector(".uploadDoc");


    title.style.display = "none";


    

    if (fName === "") {
        title.style.display = "block";
        require[0].style.display = "inline-block";
    } else {
        require[0].style.display = "none";
    }

    if (email === "") {
        title.style.display = "block";
        require[1].style.display = "inline-block";
    } else {
        require[1].style.display = "none";
    }
    if (phone === "") {
        title.style.display = "block";
        require[2].style.display = "inline-block";
        mobError.style.display = "none";
    } else if (!/^\d{10}$/.test(phone)) {
        require[2].style.display = "none";
        mobError.style.display = "block";
        document.querySelector("input[name='phone']").focus()
    } else {
        require[2].style.display = "none";
        mobError.style.display = "none";
    }

    if (chooseCountry === "select") {
        title.style.display = "block";
        require[3].style.display = "inline-block";
    } else {
        require[3].style.display = "none";
    }

    if (city === "") {
        title.style.display = "block";
        require[4].style.display = "inline-block";
    } else {
        require[4].style.display = "none";
    }

    if (pwd === "") {
        title.style.display = "block";
        require[5].style.display = "inline-block";
    } else {
        require[5].style.display = "none";
    }

    if (cpwd === "") {
        title.style.display = "block";
        require[6].style.display = "inline-block";
    } else {
        require[6].style.display = "none";
    }

    if (file1 === "") {
        title.style.display = "block";
        require[7].style.display = "inline-block";
    } else {
        require[7].style.display = "none";
    }

    if (file2 === "") {
        title.style.display = "block";
        require[8].style.display = "inline-block";
    } else {
        require[8].style.display = "none";
    }

    if (list2 === "select") {
        title.style.display = "block";
        require[9].style.display = "inline-block";
    } else {
        require[9].style.display = "none";
    }

    if (link === "") {
        title.style.display = "block";
        require[10].style.display = "inline-block";
    } else {
        require[10].style.display = "none";
    }

    if (pwd !== cpwd) {
        passError.style.display = "block";
    } else if (pwd === "password" || pwd === "Password") {
        notPass.style.display = "block"
    } else if (pwd.length < 8) {
        minLength.style.display = "block"
    }
    else {
        notPass.style.display = "none"
        minLength.style.display = "none"
        passError.style.display = "none"
    }


    if (
        title.style.display === "block" ||
        Array.from(require).some((error) => error.style.display === "inline-block") ||
        passError.style.display === "block" || mobError.style.display === "block"
    ) {
        event.preventDefault();
    } else if (
        fName !== "" &&
        email !== "" &&
        phone !== "" &&
        city !== "" &&
        pwd !== "" &&
        cpwd !== "" &&
        file1 !== "" &&
        file2 !== "" &&
        chooseCountry !== "select" &&
        list2 !== "select" &&
        link !== ""
    ) {
        alert("Success! Form is Submitted");
        document.getElementById("submit-button").innerHTML = "Submit"

        mobError.style.display = "none"

        form.reset()
        imagePreview.src = "";
        docPreview.src = "";
        docPreview.style.display = "none"
        

        if(editMode){
            const formDataObject = {
                "Full Name": fName,
                "Email": email,
                "Phone": phone,
                "Country": chooseCountry,
                "City": city,
                "Password": pwd,
                "Relocation": relocation,
                "Resume": docPreviewData,
                "Profile Picture": imagePreviewData,
                "Programming Language": list2,
                "Github": link,
                "Action": null
            };
            updateTableRow(editingRow, formDataObject)
            editMode = false

        }else{
            const formDataObject = {
                "Full Name": fName,
                "Email": email,
                "Phone": phone,
                "Country": chooseCountry,
                "City": city,
                "Password": pwd,
                "Relocation": relocation,
                "Resume": docPreviewData,
                "Profile Picture": imagePreviewData,
                "Programming Language": list2,
                "Github": link,
                "Action": null
            };

            handleFormData(formDataObject);
        }

        

    }
}