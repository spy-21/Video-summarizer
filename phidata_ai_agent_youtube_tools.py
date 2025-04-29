
from phi.agent import Agent
from phi.tools.youtube_tools import YouTubeTools
from phi.model.groq import Groq
from dotenv import load_dotenv
import streamlit as st

load_dotenv()


def youtube_video_details(link):

    agent = Agent(
        model = Groq(id="meta-llama/llama-4-scout-17b-16e-instruct"),
        tools=[YouTubeTools()],
        show_tool_calls=True,
        description="You are a YouTube agent. Obtain the captions and metadata of a YouTube video and give details.",
    )
    
    output = agent.run("Summarize this YouTube video: " + link, markdown=True)

    return output.content



def main():
    
    html_temp = """
    <div style="background-color:cyan;padding:8px">
    <h2 style="color:black;text-align:center;">YouTube Video Summary Extraction by AI Agent</h2>
    </div>
    """
    st.markdown(html_temp,unsafe_allow_html=True)    
    
    st.image("logo.jpg", width=300)

    st.markdown("""
        <style>
            .stFileUploader label {
                font-size: 10px; /* Adjust font size as needed */
            }

        </style>

    """, unsafe_allow_html=True)
    
    st.markdown(
    "<p style='color: purple; font-size: 18px; font-weight: bold;'>YouTube Video Link</p>",
    unsafe_allow_html=True
    )

    link = st.text_input("")
    
    st.markdown("""
    <style>
    div.stButton > button:first-child {
        background-color: #DD3300;
        color:#eeffee;
    }
    </style>""", unsafe_allow_html=True)

    if st.button("Extract Video Summary"):
        results = youtube_video_details(link)
        st.success('Results {}'.format(results))
    

if __name__=='__main__':
    main()



