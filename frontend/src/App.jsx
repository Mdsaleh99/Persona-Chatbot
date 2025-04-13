import Home from "./components/ChaiAi"
import ChatPage from "./components/ChatPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const buddies = {
  hitesh: {
    name: "Hitesh Choudhary",
    role: "YouTuber & Tech Mentor",
    slug: "hitesh",
    description:
      "Hanji! Kaise hain aap? 😄 Swagat hai aapka is tech chat mein! Yahan hum karte hain real-world wali programming, bina kisi distraction ke – seedha kaam, seedha code. Bataiye, kya seekhna hai aaj?",
  },
  piyush: {
    name: "Piyush Garg",
    slug: "piyush",
    role: "Founder at Teachyst & Educator",
    description:
      "Hey everyone! Welcome back 😄 Aaj ke chat mein explore karenge kuch interesting tech cheezein – AI se lekar web dev tak! Kya banayein aaj? AI Agent ho ya koi naya side project – batao, shuru karein? 🚀",
  },
  rakesh: {
    name: "Rakesh (Coder's Gyan)",
    slug: "rakesh",
    role: "Fullstack Developer & Educator",
    description:
      "Namaste doston! Swagat hai aapka is tech journey mein 😊 Yahan hum sirf code nahi likhte, samajhte hain uska logic, uski depth. Aap bataiye – kis topic par baat karein aaj? Let's build something meaningful together!",
  },
};

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/hitesh-chat"
            element={
              <ChatPage
                name={buddies.hitesh.name}
                role={buddies.hitesh.role}
                description={buddies.hitesh.description}
                slug={buddies.hitesh.slug}
              />
            }
          />
          <Route
            path="/piyush-chat"
            element={
              <ChatPage
                name={buddies.piyush.name}
                role={buddies.piyush.role}
                description={buddies.piyush.description}
                slug={buddies.piyush.slug}
              />
            }
          />
          <Route
            path="/rakesh-chat"
            element={
              <ChatPage
                name={buddies.rakesh.name}
                role={buddies.rakesh.role}
                description={buddies.rakesh.description}
                slug={buddies.rakesh.slug}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App
