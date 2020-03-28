function moveRowDown(row,idx){
 var lastRow = false;
 currRow = $x_UpTill(row, 'TR');
 currTable = currRow.parentNode;
 ie_RowFixStart(currRow);
 nextRow = currRow.nextSibling;

 while(nextRow != null){
  if(nextRow.nodeType ==1){break;}
  nextRow = nextRow.nextSibling;
 }

 var currRowSeqEle = $('input[name="' + idx + '"]', currRow)[0];
 var nextRowSeqEle =$('input[name="' + idx + '"]', nextRow)[0];
 var currValue = currRowSeqEle.value;
 var nextValue = nextRowSeqEle.value;

 if(nextRow ){
  currRowSeqEle.value = nextValue;
  nextRowSeqEle.value = currValue;
  currTable.insertBefore(currRow, nextRow.nextSibling);
 }else {
  //if you want to implement that it goes back to top. I'm not bothering.
  //currTable.insertBefore(currRow, currTable.getElementsByTagName('TR')[1]);
 }
}

function moveRowUp(row, idx){
 var firstRow = false;
 currRow = $x_UpTill(row, 'TR');
 currTable = currRow.parentNode;
 prevRow = currRow.previousSibling;
 while(prevRow != null){
  if(prevRow.nodeType ==1){break;}
  prevRow = prevRow.previousSibling;
 }

 var currRowSeqEle = $('input[name="' + idx + '"]', currRow)[0];
 var prevRowSeqEle =$('input[name="' + idx + '"]', prevRow)[0];
 var currValue = currRowSeqEle.value;
 var prevValue = prevRowSeqEle.value;

 if(prevRow != null && prevRow.firstChild.nodeName != 'TH'){

  currRowSeqEle.value = prevValue;
  prevRowSeqEle.value = currValue;
  currTable.insertBefore(currRow, prevRow);
 } else {
  //if you want to implement that it goes back to top. I'm not bothering.
  //currTable.appendChild(currRow);
    }
}

function setSequence (idx){
	var colForm = $('input[name="' + idx + '"]');
	
	for (var i = 1;i <= colForm.length;i++){
		colForm[i-1].value = i;
	}
}

function deleteTrazado(p_this, p_trazadoId) {
	// get the table row on which the user clicked
  
	var txt;
	var r = confirm("¿Desea eliminar el Trazado?");
	if (r == true) {
	
		var tr = $(p_this).closest('tr');

		// perform an asynchronous HTTP AJAX request using jQuery
		$.ajax({
		type: 'POST',
		url: 'wwv_flow.show',
		data: {
			p_flow_id: $('#pFlowId').val(),
			p_flow_step_id: $('#pFlowStepId').val(),
			p_instance: $('#pInstance').val(),
			x01: p_trazadoId,  // assign p_trazadoId to the g_x01 global variable
			p_request: 'APPLICATION_PROCESS=delete_trazado'  // reference the application process
		},
		beforeSend:  // executes while the AJAX call is being processed
			function() {
				// delete following HTML classes from the table row element
				// could be possibly theme dependent
				tr.removeClass('even');
				tr.removeClass('odd');

				// use jQuery's animate function to give the table row, and its children, a red background
				tr.children().hover(function() {
				  tr.children().animate({'backgroundColor': '#fbc7c7'}, 300);
				}, function() {
				  tr.children().animate({'backgroundColor': '#fbc7c7'}, 300);
				});
				tr.children().animate({'backgroundColor': '#fbc7c7'}, 300);
			},
		success:  // to be called if the request succeeds
			function() {
				// jQuery has difficulties animating inline elements
				// that's why we wrap them in a div, which is a block element
				tr.children().wrapInner('<div>').children().fadeOut(400, function() {
				  tr.remove();  // visually remove the row from the report
				});
				refresh_canvas();
			}
		});
		
	}
}