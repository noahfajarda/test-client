// only for ticket status
export function renderStatus(ticket){
    const isSecondReviewIncomplete = ticket.secondReviewerOriginalTicket || ticket.originalTicketId && ticket.status ==='New';
    const awaitingPayment = ticket.status === 'New' && !ticket.depositPaid;
    const awaitingConfirmation = ticket.status === 'New' && !ticket.readyForCpaReview;
    const confirmed = ticket.status === 'New' && ticket.readyForCpaReview;
    const inProgress = ticket.status !== 'Complete';
    const needsEFileAuth = ticket.status === 'In Review' && ticket.agreement8879?.link && ticket.agreement8879?.link !== 'No e-file' && !ticket.agreement8879.agreed;
    if(awaitingPayment) return 'Awaiting payment';
    if(awaitingConfirmation) return 'Awaiting confirmation';
    if(confirmed && !isSecondReviewIncomplete) return 'Awaiting firm confirmation';
    if(ticket.status === 'In Review' && ticket.pricePaid < ticket.price && ticket.finalTaxReturn && ticket.finalTaxReturn.file && ticket.finalTaxReturn.status === 'Sent to Client') return 'Awaiting final payment';
    if(needsEFileAuth) return 'Awaiting client signature';
    if(inProgress || isSecondReviewIncomplete) return 'In Progress';
    return 'Completed';
} 

export function ticketStatusBarInfo(ticket) {
    return [
        {
            label:'Request Received',
            statusPassed: ticket?.secondReviewerOriginalTicket || ticket?.originalTicketId || ticket?.status !== 'New',
            statusActive:ticket?.status === 'New',
            timestamp:ticket?.secondReviewerOriginalTicket ? ticket?.secondReviewerOriginalticket?.createdAt : (ticket?.originalTicketId ? ticket?.originalTicketId.createdAt : ticket?.createdAt),
            percentage: 3
        },
        {
            label:'Preparing',
            statusPassed:!['New', 'Pool', 'Pre Pool Review', 'Claimed'].includes(ticket?.status),
            statusActive:ticket?.secondReviewerOriginalTicket || ticket?.originalTicketId || ['Pool', 'Pre Pool Review', 'Claimed'].includes(ticket?.status),
            timestamp:ticket?.secondReviewerOriginalTicket || ticket?.originalTicketId ? ticket?.createdAt : ticket?.sentToPool,
            percentage: 35
        },
        {
            label:'In Review',
            statusPassed:!['New', 'Pool', 'Pre Pool Review', 'Claimed', 'Post Prep Review', 'In Review', 'Revision', 'Revision Staging'].includes(ticket?.status),
            statusActive:['Post Prep Review', 'In Review', 'Revision', 'Revision Staging'].includes(ticket?.status),
            timestamp:ticket?.sentToReview,
            percentage: 67
        },
        {
            label:'Complete',
            statusActive:ticket?.status === 'Complete',
            timestamp:ticket?.sentToClient,
            percentage: 100
        }
    ]
}

export function formatDateTime(timestamp, seconds?: boolean | undefined) {
    const myDate = new Date(timestamp)

    const formattedDate = myDate.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
    const formattedTime = myDate.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        hour:'numeric',
        minute: 'numeric',
        hour12: true,
        second: seconds ? '2-digit' : undefined
    })

    return {formattedDate, formattedTime}
}

export function addCommas(num: Number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

export const getFormName = (filingName: string) => {
    const returnObj = {
        formName:'N/A',
        taxReturn:true
    }
    switch (filingName) {
        case 'Audited':
            returnObj.formName = 'Audited Financials';
            returnObj.taxReturn = false;
            break;
        case 'Tax Research':
            returnObj.formName = 'Research';
            returnObj.taxReturn = false;
            break;
        case 'Wealth Management':
            returnObj.formName = 'Wealth Plan';
            returnObj.taxReturn = false;
            break;
        case 'Tax Planning':
            returnObj.formName = 'Tax Plan';
            returnObj.taxReturn = false;
            break;
        case 'Estate Planning':
            returnObj.formName = 'Estate Plan';
            returnObj.taxReturn = false;
            break;
        case 'Estate Planning RET':
            returnObj.formName = 'Estate Plan (RET)';
            returnObj.taxReturn = false;
            break;
        case 'Estate Planning PPA':
            returnObj.formName = 'Estate Plan (PPA)';
            returnObj.taxReturn = false;
            break;
        case 'Estate Planning PBA':
            returnObj.formName = 'Estate Plan (PBA)';
            returnObj.taxReturn = false;
            break;
        default:
            returnObj.formName = false;
            break;
    }
    
    return returnObj;
}

export const resetPasswordValidation = ({password, setError, setIsLoading}) => {
    // check if it meets criteria
    // at least 6 characters         r"^.{6,}$".test(s)
    if (!/^.{6,}$/.test(password)) {
        setIsLoading(false)
        setError("Password must contain at least 6 characters.")
        return false
    }
    // one capital                  /[A-Z]/.test(s);
    if (!/[A-Z]/.test(password)) {
        setIsLoading(false)
        setError("Password must contain a capital letter.")
        return false
    }
    // one special                  [!@#$%^&*(),.?":{}|<>].test(s)
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        setIsLoading(false)
        setError("Password must contain a special character.")
        return false
    }
    return true
}

export function lightenColor({color, percent} : {color: string; percent: number;}) {
    // Convert hex color to RGB
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    // Convert RGB to HSL
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    // Increase lightness by the given percentage
    l = Math.min(1, l + percent / 100);

    // Convert HSL back to RGB
    let r1, g1, b1;

    if (s == 0) {
        r1 = g1 = b1 = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;

        r1 = hue2rgb(p, q, h + 1 / 3);
        g1 = hue2rgb(p, q, h);
        b1 = hue2rgb(p, q, h - 1 / 3);
    }

    r1 = Math.round(r1 * 255);
    g1 = Math.round(g1 * 255);
    b1 = Math.round(b1 * 255);

    // Convert RGB back to hex
    return `#${((1 << 24) + (r1 << 16) + (g1 << 8) + b1).toString(16).slice(1).toUpperCase()}`;
}

export function isLuminosityAboveThreshold({hexColor, threshold}: {hexColor: string; threshold: number}) {
    // hex to rgb
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);

    const [red, green, blue] = [r, g, b].map(value => {
      value /= 255;
      return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });

    const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    return luminance > threshold;
}

export function darkenColor({color, percent} : {color: string; percent: number;}) {
    // Convert hex color to RGB
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    // Convert RGB to HSL
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    // Decrease lightness by the given percentage
    l = Math.max(0, l - percent / 100);

    // Convert HSL back to RGB
    let r1, g1, b1;

    if (s === 0) {
        r1 = g1 = b1 = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;

        r1 = hue2rgb(p, q, h + 1 / 3);
        g1 = hue2rgb(p, q, h);
        b1 = hue2rgb(p, q, h - 1 / 3);
    }

    r1 = Math.round(r1 * 255);
    g1 = Math.round(g1 * 255);
    b1 = Math.round(b1 * 255);

    // Convert RGB back to hex
    return `#${((1 << 24) + (r1 << 16) + (g1 << 8) + b1).toString(16).slice(1).toUpperCase()}`;
}