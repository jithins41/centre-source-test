function loadSubCategory(event) {
    let value = event.target.value;
    console.log(value)
    $.ajax({

        url: '/subcategory/load',
        data: {value},
        method: 'POST',
        success: (response) => {
            console.log(response);
            $('#subcategory').find('option').remove().end().append(`<option value="">Select</option>`)
            response.forEach((element) => {
                $('#subcategory').append(`<option value="${element.subcatid}">${element.subcatname}</option>`)
            })
        }
    })
}