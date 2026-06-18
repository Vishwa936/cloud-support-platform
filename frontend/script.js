const GET_URL = "https://ju8j5kgpw0.execute-api.ap-southeast-2.amazonaws.com/prod/tickets";
const POST_URL = "https://ju8j5kgpw0.execute-api.ap-southeast-2.amazonaws.com/prod/createticket";

async function loadTickets(){

    const response = await fetch(GET_URL);

    const tickets = await response.json();

    let html = "";

  tickets.forEach(ticket => {

    const date = ticket.timestamp
    ? new Date(ticket.timestamp).toLocaleString(
        'en-AU',
        {
            timeZone: 'Australia/Sydney',
            day:'numeric',
            month:'short',
            year:'numeric',
            hour:'numeric',
            minute:'2-digit'
        }
    )
    : "Older Ticket";

    html += `
    <div class="ticket-card">
        
        <small>${date}</small> 

        <h3>${ticket.customer}</h3>

        <p>${ticket.issue}</p>

        <span class="status">
            ${ticket.status}
        </span>

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

    const msg = document.getElementById("message");

    msg.innerHTML = "Ticket created successfully!";
    msg.style.display = "block";

    document.getElementById("customer").value = "";
    document.getElementById("issue").value = "";
    loadTickets();

}

loadTickets();