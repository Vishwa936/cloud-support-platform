const GET_URL = "https://ju8j5kgpw0.execute-api.ap-southeast-2.amazonaws.com/prod/tickets";
const POST_URL = "https://ju8j5kgpw0.execute-api.ap-southeast-2.amazonaws.com/prod/createticket";

async function loadTickets(){

    const response = await fetch(GET_URL);

    const tickets = await response.json();

    let html = "";

    tickets.forEach(ticket => {

        html += `
        <div>
            <b>${ticket.customer}</b><br>
            ${ticket.issue}<br>
            Status: ${ticket.status}
            <hr>
        </div>
        `;
    });

    document.getElementById("tickets").innerHTML = html;
}

async function createTicket(){

    const customer =
    document.getElementById("customer").value;

    const issue =
    document.getElementById("issue").value;

    await fetch(POST_URL,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            customer,
            issue
        })
    });

    loadTickets();
}

loadTickets();