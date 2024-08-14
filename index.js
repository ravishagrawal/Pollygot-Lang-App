import OpenAI from "openai"

const translateBtn = document.getElementById("translate-btn")
const inputTextEl = document.getElementById("translate-text")
const languageChosenEl = document.getElementById("language-option")
const inputSectionEl = document.getElementById("output-section")


translateBtn.addEventListener ("click", function(){
    
    let translationText = inputTextEl.value
    let langugeChosen = languageChosenEl.elements["language"].value
    translate(langugeChosen,translationText)
    
})

function renderResponse (data) {
    
    inputSectionEl.innerHTML = `
            
            <p class="input-heading"> Your Translation 👇 </p>
            <div class="output-box">
                <p>${data}</textarea>
            </div>
            <button onClick = location.reload()> START OVER </button>   
    `
    
}

async function translate (langugeChosen,translationText) {
    try {
        const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    })
    
    const messages = [
        {
            role: "system",
            content: "You are an AI translator"
        },
        
        {
            role: "user",
            content: `Translate ${translationText} to ${langugeChosen}`
        }
        
    ]
    
    const response = await openai.chat.completions.create ({
        model: 'gpt-4',
        messages: messages,
        temperature: 1,
        max_tokens: 1000
    })
    
    renderResponse(response.choices[0].message.content)
    }
    catch (err) {
        inputSectionEl.innerHTML = err.message
    }
    
}