class SimpleDataTableWidget{

    constructor(containerID)

    {

        let objName = "dataTableExample";

        let dialogs = "\n" +

            "<div class=\"modal fade\" id=\"addRowModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addRowModalTitle\" aria-hidden=\"true\">\n" +

            "    <div class=\"modal-dialog modal-sm\" role=\"document\">\n" +

            "        <div class=\"modal-content\">\n" +

            "            <div class=\"modal-header\">\n" +

            "                <h5 class=\"modal-title\" id=\"addRowModalTitle\">Добавить</h5>\n" +

            "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Отмена\">\n" +

            "                    <span aria-hidden=\"true\">&times;</span>\n" +

            "                </button>\n" +

            "            </div>\n" +

            "            <div class=\"modal-body\">\n" +

            "                <div class=\"\">\n" +

            "                    <label for=\"markCreateInput\">Марка</label>\n" +

            "                    <input required id=\"markCreateInput\" type=\"text\" class=\"form-control\">\n" +

            "                    <label for=\"markCreateInput\">Модель</label>\n" +

            "                    <input  required id=\"modelCreateInput\" type=\"text\" class=\"form-control\">\n" +

            "                    <label for=\"markCreateInput\">Год</label>\n" +

            "                    <input required id=\"yearCreateInput\" type=\"number\" class=\"form-control\">\n" +

            "                    <label for=\"markCreateInput\">Тип</label>\n" +

            "                    <input required id=\"typeCreateInput\" type=\"text\" class=\"form-control\">\n" +

            "                </div>\n" +

            "            </div>\n" +

            "            <div class=\"modal-footer\">\n" +

            "                <button id=\"closeAddRowModal\" type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Отмена</button>\n" +

            "                <button type=\"button\" class=\"btn btn-primary\" onclick=\"onClickCreatePerson('"+objName+"')\">Создать</button>\n" +

            "            </div>\n" +

            "        </div>\n" +

            "    </div>\n" +

            "</div>\n" +

            "\n" +

            "<div class=\"modal fade\" id=\"deleteRowsModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"deleteRowsModalTitle\" aria-hidden=\"true\">\n" +

            "    <div class=\"modal-dialog modal-sm\" role=\"document\">\n" +

            "        <div class=\"modal-content\">\n" +

            "            <div class=\"modal-header\">\n" +

            "                <h5 class=\"modal-title\" id=\"deleteRowsModalTitle\">Удалить</h5>\n" +

            "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +

            "                    <span aria-hidden=\"true\">&times;</span>\n" +

            "                </button>\n" +

            "            </div>\n" +

            "            <div class=\"modal-body\">\n" +

            "                Вы действительно хотите удалить?\n" +

            "            </div>\n" +

            "            <div class=\"modal-footer\">\n" +

            "                <button id=\"closeDeleteRowsModalModal\" type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Отменаl</button>\n" +

            "                <button type=\"button\" class=\"btn btn-danger\" onclick=\"onClickDeletePerson('"+objName+"')\">Да</button>\n" +

            "            </div>\n" +

            "        </div>\n" +

            "    </div>\n" +

            "</div>\n" +

            "\n" +

            "<div class=\"modal fade\" id=\"updateRowModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"updateRowModalTitle\" aria-hidden=\"true\">\n" +

            "    <div class=\"modal-dialog modal-sm\" role=\"document\">\n" +

            "        <div class=\"modal-content\">\n" +

            "            <div class=\"modal-header\">\n" +

            "                <h5 class=\"modal-title\" id=\"updateRowModalTitle\">Обновить</h5>\n" +

            "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Отмена\">\n" +

            "                    <span aria-hidden=\"true\">&times;</span>\n" +

            "                </button>\n" +

            "            </div>\n" +

            "            <div class=\"modal-body\">\n" +

            "                <label for=\"markCreateInput\">Марка</label>\n" +

            "                <input required id=\"markUpdateInput\" type=\"text\" class=\"form-control\">\n" +

            "                <label for=\"markCreateInput\">Модель</label>\n" +

            "                <input  required id=\"modelUpdateInput\" type=\"text\" class=\"form-control\">\n" +

            "                <label for=\"markCreateInput\">Год</label>\n" +

            "                <input required id=\"yearUpdateInput\" type=\"number\" class=\"form-control\">\n" +

            "                <label for=\"markCreateInput\">Тип</label>\n" +

            "                <input required id=\"typeUpdateInput\" type=\"text\" class=\"form-control\">\n" +

            "                <input hidden required id=\"keyUpdateInput\" type=\"text\" class=\"form-control\">\n" +

            "\n" +

            "            </div>\n" +

            "            <div class=\"modal-footer\">\n" +

            "                <button id=\"closeUpdateRowModal\" type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Отмена</button>\n" +

            "                <button type=\"button\" class=\"btn btn-primary\" onclick=\"onClickUpdateSavePerson('"+objName+"')\">Подтвердить</button>\n" +

            "            </div>\n" +

            "        </div>\n" +

            "    </div>\n" +

            "</div>\n" +

            "\n" +

            "\n" +

            "\n" +

            "\n";

        let thisObj = this;

        this.containerID = containerID;

        $("html").append(dialogs);

        this.db = firebase.database();

        this.allPersons = [];

        this.displayPersons = [];

        this.sortField = null;

        this.isDescSort = false;

        this.filter = '';

        this.currentPage = 0;

        this.displayPagesCount = 0;

        this.rowsOnPage = 5;

        this.maxDisplayPages = 10;



        this.personFields = ['mark','model','type','year'];



        this.personRef = this.db.ref('person');

        this.createInputMark = $('#markCreateInput');

        this.createInputModel = $('#modelCreateInput');

        this.createInputYear = $('#yearCreateInput');

        this.createInputType = $('#typeCreateInput');



        this.updateInputMark = $('#markUpdateInput');

        this.updateInputModel = $('#modelUpdateInput');

        this.updateInputYear = $('#yearUpdateInput');

        this.updateInputType = $('#typeUpdateInput');

        this.updateInputKey = $('#keyUpdateInput');



        this.personRef.on('child_added', function(data) {

            let newPerson = data.val();

            newPerson.key = data.key;

            thisObj.allPersons.push(newPerson);

            thisObj.refresh();

        });



        this.personRef.on('child_changed', function(data) {

            let newPerson = data.val();

            newPerson.key = data.key;

            let foundIndex = thisObj.allPersons.findIndex(function (item) {

                return item.key === data.key;

            });

            if(foundIndex !== -1)

            {

                thisObj.allPersons[foundIndex] = newPerson;

            }

            thisObj.refresh();

        });



        this.personRef.on('child_removed', function(data) {

            thisObj.allPersons = thisObj.allPersons.filter(function(item){

                return item.key !== data.key;

            });

            thisObj.refresh();

        });





        this.filterBy();

        this.sortByField();

        this.renderWidget();

    }



    createPerson(mark, model, year, type) {

        let newUser = {

            mark : mark,

            model: model,

            year : year,

            type: type

        };

        this.db.ref('person').push(newUser);

    }



    updatePerson(key,mark, model, year, type)

    {

        let newUser = {

            mark : mark,

            model: model,

            year : year,

            type: type

        };



        this.db.ref('person/'+key).set(newUser);

    }

    deletePerson(key)

    {

        this.db.ref('person/'+key).remove();

    }

    renderWidget()

    {

        let objectName = "dataTableExample";

        let container = $(this.containerID);

        container.html('');

        let searchDiv = $('<div class="form-group row" style="margin: 20px 0 10px 10px">');

        searchDiv.append('<label for="searchInput" class="col-sm-1 col-form-label">Search</label>');

        searchDiv.append(

            $('<div class="col-sm-4">').append(

                $('<input id="searchInput" class="form-control" onchange="onClickFilter(\''+objectName+'\');">').val(this.filter)

            )

        );

        container.append(searchDiv);

        container.append($('<div>').text('Count of rows: ' + this.displayPersons.length));

        let tableHtml = $('<table class="table table-striped">');

        let header = $('<tr>');

        header.append($('<th>').html('<i class="fas fa-trash"></i>'));

        header.append($('<th>').html('<i class="fas fa-edit"></i>'));

        header.append($('<th>').text('Number'));

        for(let i =0;i<this.personFields.length;i++)

        {

            let a = $('<a href="#">').click({param1:objectName},onClickSortByField).text(this.personFields[i]);

            if(this.personFields[i] === this.sortField)

            {

                a = $('<b>').append(a).append(this.isDescSort?' <i class="fas fa-long-arrow-alt-down"></i>':' <i class="fas fa-long-arrow-alt-up"></i>');

            }else{

                a = $('<span>').append(a).append(' <i class="fas fa-arrows-alt-v" style="color: rgba(133,133,133,0.31)"></i>');

            }

            header.append($('<th>').append(a))

        }

        tableHtml.append(header);

        let firstDisplayI = (this.currentPage) * this.rowsOnPage;

        let lastDisplayI = ((this.currentPage) * this.rowsOnPage + this.rowsOnPage < this.displayPersons.length)? (this.currentPage) * this.rowsOnPage + this.rowsOnPage: this.displayPersons.length;

        for(let i =  firstDisplayI;i<lastDisplayI;i++)

        {

            let rowHtml = $('<tr>');

            rowHtml.append($('<td>').html('<input type="checkbox" name="type" value="'+this.displayPersons[i].key+'" />'));

            rowHtml.append($('<td>').append($('<a href="#" class="fas fa-pen">').click({param1:i,param2:objectName},onClickUpdatePerson)));

            rowHtml.append($('<td>').text(i));

            for(let j =0;j<this.personFields.length;j++)

            {

                rowHtml.append(

                    $('<td>').text(this.displayPersons[i][this.personFields[j]])

                );

            }

            rowHtml.append( $('<td id="key' + i + '" hidden>').text(this.displayPersons[i].key));

            tableHtml.append(rowHtml);

        }

        container.append(tableHtml);

        let pagination = $('<div class="col-md-12" style="margin: 10px">');

        let allPagesCount = Math.ceil((this.displayPersons.length ) / this.rowsOnPage);

        this.displayPagesCount = (allPagesCount > this.maxDisplayPages)? this.maxDisplayPages : allPagesCount;

        let firstDisplayPage = 0;

        let lastDisplayPage = this.displayPagesCount;

        if(allPagesCount > this.maxDisplayPages)

        {

            if(this.currentPage - Math.trunc(this.maxDisplayPages/2) < 0)

            {

                firstDisplayPage = 0;

                lastDisplayPage = this.maxDisplayPages;

            }

            else if(this.currentPage + Math.trunc(this.maxDisplayPages/2) > allPagesCount)

            {

                firstDisplayPage = allPagesCount - 10;

                lastDisplayPage = allPagesCount;

            }else{

                firstDisplayPage = this.currentPage - Math.trunc(this.maxDisplayPages/2);

                lastDisplayPage = this.currentPage + Math.trunc(this.maxDisplayPages/2);

            }

        }



        for(let i = firstDisplayPage;i<lastDisplayPage;i++)

        {

            let enable = 'enable';

            if(i === this.currentPage)

                enable = 'disabled';

            let button = $('<button ' + enable +' class="btn btn-sm btn-info" style="margin: 2px 10px 10px 0; width: 40px; height: 40px;">').text(i+1);

            button.click({param1:objectName},onSwitchPageClick);

            pagination.append(button);

        }

        container.append(pagination);

        //control buttons

        let controlPanel = $('<div style="margin: 10px 20px 10px 20px">');

        controlPanel.append($('<button  type="button" class="btn btn-primary" data-toggle="modal" data-target="#addRowModal" style=" color: white">').text('Create'));

        controlPanel.append($('<button class="btn btn-danger" data-toggle="modal" data-target="#deleteRowsModal" style=" margin-left: 10px ;">').text('Delete Selected'));

        controlPanel.append($('<button class="btn btn-info" style=" margin-left: 10px ;">').text('Refresh').click(function (objName) {window[objName].refresh();}));

        controlPanel.append($('<button hidden id="updateButton" data-toggle="modal" data-target="#updateRowModal">').text('Update'));

        container.append(controlPanel);


    }

    refresh() {

        this.filterBy();

        this.sortByField();

        this.renderWidget();

    }

    sortByField()

    {

        if(this.sortField !== null)

        {

            if(typeof this.allPersons[0][this.sortField] === "number")

            {

                if(this.isDescSort)

                {

                    this.displayPersons = this.displayPersons.sort((a,b) =>{

                        return a[this.sortField] - b[this.sortField];

                    });

                }else{

                    this.displayPersons = this.displayPersons.sort((a,b) => {

                        return b[this.sortField] - a[this.sortField];

                    });

                }



            }else{

                if(this.isDescSort)

                {

                    this.displayPersons = this.displayPersons.sort((a,b) => {

                        return -a[this.sortField].localeCompare(b[this.sortField])

                    });

                }else{

                    this.displayPersons = this.displayPersons.sort( (a,b)=>{



                        return a[this.sortField].localeCompare(b[this.sortField])

                    });

                }



            }



        }

    }

    filterBy()

    {

        if(this.filter !== '')

        {

            this.displayPersons = this.allPersons.filter( (value)=>{

                return value.type.indexOf(this.filter) !== -1

                    || value.mark.indexOf(this.filter) !== -1

                    || value.model.indexOf(this.filter) !== -1

                    || (value.year+'').indexOf(this.filter) !== -1

            });

        }else

            this.displayPersons = this.allPersons.slice(0);

    }

}


function onSwitchPageClick(objName)

{

    let datatableonj = window[objName.data.param1];

    datatableonj.currentPage = parseInt(this.innerText) - 1;

    console.log(this);

    datatableonj.renderWidget();

}


function onClickFilter(objName)

{

    let datatableonj = window[objName];

    datatableonj.filter = $('#searchInput').val();

    console.log(datatableonj.filter);

    datatableonj.filterBy();

    datatableonj.renderWidget();

}

function onClickSortByField(objName)

{

    let datatableonj = window[objName.data.param1];

    let oldSortField = datatableonj.sortField;

    datatableonj.sortField = this.innerText;

    if(oldSortField === datatableonj.sortField) {

        datatableonj.isDescSort = !datatableonj.isDescSort;

    }else{

        datatableonj.isDescSort = false;

    }

    datatableonj.sortByField();

    datatableonj.renderWidget();

}


function onClickCreatePerson(objName)

{

    let datatableonj = window[objName];

    let mark = datatableonj.createInputMark.val();

    let model = datatableonj.createInputModel.val();

    let year = datatableonj.createInputYear.val();

    let type = datatableonj.createInputType.val();

    if(mark === '' || model === '' || year === '' || type === '')

        return;

    datatableonj.createPerson(mark,model,parseInt(year),type);

    $('#closeAddRowModal').click();

    datatableonj.createInputMark.val('');

    datatableonj.createInputModel.val('');

    datatableonj.createInputYear.val('');

    datatableonj.createInputType.val('');



}

function onClickDeletePerson(objName) {

    let datatableonj = window[objName];

    let selected = [];



    $("input:checkbox[name=type]:checked").each(function() {

        selected.push($(this).val());

    });

    selected.forEach(function (value) {

        datatableonj.deletePerson(value);

    });

    $('#closeDeleteRowsModalModal').click();

}

function onClickUpdatePerson(event) {

    let index = event.data.param1;

    let datatableonj = window[event.data.param2];

    $('#updateButton').click();

    datatableonj.updateInputMark.val(datatableonj.displayPersons[index].mark);

    datatableonj.updateInputModel.val(datatableonj.displayPersons[index].model);

    datatableonj.updateInputYear.val(datatableonj.displayPersons[index].year);

    datatableonj.updateInputType.val(datatableonj.displayPersons[index].type);

    datatableonj.updateInputKey.val(datatableonj.displayPersons[index].key);

}

function onClickUpdateSavePerson(objName) {

    let datatableonj = window[objName];

    let mark = datatableonj.updateInputMark.val();

    let model = datatableonj.updateInputModel.val();

    let year = datatableonj.updateInputYear.val();

    let type = datatableonj.updateInputType.val();

    let key = datatableonj.updateInputKey.val();



    if(mark === '' || model === '' || year === '' || type === '')

        return;

    datatableonj.updatePerson(key,mark,model,parseInt(year),type);



    $('#closeUpdateRowModal').click();



    datatableonj.updateInputMark.val('');

    datatableonj.updateInputModel.val('');

    datatableonj.updateInputYear.val('');

    datatableonj.updateInputType.val('');

}