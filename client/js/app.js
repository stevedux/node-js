
class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        $.get(url, (response) => {
           this.inicializarCalendario(response)
        })
    }

    eliminarEvento(evento) {
        let eventId = evento.id
        let url = this.urlBase + "/delete"

        $.post(url, {id: eventId}, (response) => {
            alert(response)
        })
    }

    actualizarEvento(evento,fecha){
        let eventId = evento.id
        let eventNuevaFecha = evento.start._i

        let eventNuevoDia = parseInt(eventNuevaFecha.substring(8, 10)) + parseInt(fecha._days)
        eventNuevaFecha = eventNuevaFecha.substring(0, 8) + eventNuevoDia + eventNuevaFecha.substring(10)

     
        /*console.log(evento)
        console.log(evento._start._i)
        console.log(fecha._days)

        console.log(eventNuevaFecha)*/


       let url = this.urlBase + "/update"

        console.log({id: eventId,nuevaFecha : eventNuevaFecha})

        $.post(url, {id: eventId,nuevaFecha : eventNuevaFecha}, (response) => {
            alert(response)
        })

        $('.calendario').fullCalendar('updateEvent',evento)





    }





    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()

            console.log("click Anexar")

            let nombre = $('#titulo').val(),
            start = $('#start_date').val(),
            title = $('#titulo').val(),
            end = '',
            start_hour = '',
            end_hour = '';

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }
            let url = this.urlBase + "/newEvento"
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end,
                    nombre : nombre
                }
                $.post(url, ev, (response) => {
                    alert(response)

                    // LIMPIO LOS CAMPOS DEL FORMULARIO
                    $(".form-inputs input[type='text']").val("")


                })
                $('.calendario').fullCalendar('renderEvent', ev)
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    inicializarCalendario(eventos) {

        //console.log(eventos)  
        
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2018-11-01',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event,date) => {
                this.actualizarEvento(event,date)
            },
            events: eventos,
            eventDragStart: (event,jsEvent) => {
                //$('.delete').find('img').attr('src', "img/trash-open.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents',event._id)
                        console.log(event._id)                        
                    }
                }
            })
        }
    }

    const Manager = new EventManager()
