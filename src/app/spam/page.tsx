import ReactMarkdown from "react-markdown";

const summary = `
**Summary:**  
The group planned a **table tennis tournament in Hyderabad**.  

After debating the timeline, they agreed on **two weeks from Saturday**.  
The venue was finalized as **Hitec City** for its central location despite higher cost, with a **₹400 entry fee per player**.  

**Format:** 6 groups of 4 players → top 2 advance → *Best of 3* in groups and *Best of 5* in knockouts.  
**Timing:** 9 AM – 6 PM  
**Prizes:** Cash + trophies for top 3 winners  

**Tasks assigned:**  
- *qweqwe* → registration form & payments  
- *asdf* → venue booking & equipment  
- *abc* → promotions & outreach  

Snacks and water will be provided. The plan is finalized — next step: **execution! 🚀**;
`

export default function ChatSummary() {
    return (
        <div className="markdown p-4 mt-4 rounded-lg ">
            <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
    );
}
