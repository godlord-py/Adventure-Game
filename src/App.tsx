import React, { useState, useEffect, useRef } from "react";

const AdventureGame = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [health, setHealth] = useState(100);
  const [inventory, setInventory] = useState([]);
  const [location, setLocation] = useState("Unknown");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/new_session/")
      .then((res) => res.json())
      .then((data) => {
        setSessionId(data.session_id);
        setMessages([{ text: data.response, type: "game" }]);
        if (data.metadata) {
          if (data.metadata.health !== undefined) setHealth(data.metadata.health);
          if (data.metadata.healthChange !== undefined) {
            setHealth(prev => Math.max(0, prev + data.metadata.healthChange));
          }
          if (data.metadata.inventory) setInventory(data.metadata.inventory);
          if (data.metadata.location) setLocation(data.metadata.location);
        }
        
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleOptionClick = (option) => {
    setInput(option.text);  
    sendCommand(option.text);  
  };
  
  const sendCommand = async (command = input) => {
    if (!command.trim() || !sessionId) return;
  
    setMessages(prev => [...prev, { text: command, type: "user" }]); 
    setInput("");  
    setIsLoading(true);
  
    try {
      const response = await fetch(`http://localhost:8000/play/?session_id=${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }), 
      });
  
      const data = await response.json();
      console.log("API Response:", data);
      setHealth(data.health)
  

      setMessages(prev => [...prev, { text: data.response, type: "game" }]);
  
      // ✅ Update health, inventory, location if available
      if (data.metadata) {
        if (data.metadata.health !== undefined) setHealth(data.metadata.health);
        if (data.metadata.inventory) setInventory(data.metadata.inventory);
        if (data.metadata.location) setLocation(data.metadata.location);
      }
    } catch (error) {
      console.error("Error sending command:", error);
      setMessages(prev => [...prev, { text: "The connection to the magical realm has been lost. Please try again.", type: "error" }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendCommand();
    }
  };

  // Function to render message with formatting and effects
  const renderMessage = (message) => {
    // Helper function to wrap specific keywords with styling
    const highlightKeywords = (text) => {
      // Define keywords to highlight with their corresponding styles
      const keywords = [
        { regex: /\b(sword|blade|dagger|axe|bow|arrow|staff|wand|shield|armor)\b/gi, class: "text-yellow-300 font-semibold" },
        { regex: /\b(gold|silver|coin|treasure|gem|ruby|emerald|diamond|jewel)\b/gi, class: "text-yellow-400 font-semibold" },
        { regex: /\b(potion|scroll|spell|magic|enchanted|mystical|arcane|ancient)\b/gi, class: "text-purple-400 font-semibold" },
        { regex: /\b(dragon|monster|creature|beast|demon|ghost|spirit|undead|goblin|troll|orc)\b/gi, class: "text-red-400 font-bold" },
        { regex: /\b(tavern|inn|castle|dungeon|cave|forest|mountain|river|bridge|village|town|city)\b/gi, class: "text-blue-300 font-semibold" },
        { regex: /\b(attack|fight|battle|defeat|slay|kill|defend|block|dodge|parry)\b/gi, class: "text-red-500 font-bold" },
        { regex: /\b(heal|restore|recover|health|life|vitality|strength|power)\b/gi, class: "text-green-400 font-semibold" },
        { regex: /"([^"]*)"/g, class: "italic text-gray-200" }, // Quoted text
        { regex: /\*([^*]*)\*/g, class: "text-yellow-200 font-bold" }, // *emphasized* text
      ];

      // Apply highlighting
      let highlightedText = text;
      
    
      highlightedText = highlightedText
      .replace(/(-\d+)\s+(damage|hp)/gi, '<span class="text-red-500 font-bold text-lg animate-pulse">$1 $2</span>')
      .replace(/(\+\d+)\s+(health|hp)/gi, '<span class="text-green-500 font-bold text-lg animate-pulse">$1 $2</span>')
      .replace(/(\+\d+)\s+(xp|experience)/gi, '<span class="text-purple-400 font-bold">$1 $2</span>')
      .replace(/level\s+up/gi, '<span class="bg-yellow-500 text-black px-2 py-1 rounded-md font-bold animate-bounce">LEVEL UP!</span>')
      .replace(/critical\s+hit/gi, '<span class="text-red-600 font-extrabold text-lg">CRITICAL HIT!</span>')
      .replace(/found\s+(.+)/gi, 'found <span class="text-yellow-300 font-bold">$1</span>');
      // Apply keyword styling
      keywords.forEach(({ regex, class: className }) => {
        highlightedText = highlightedText.replace(regex, match => {
          if (match.startsWith('*') && match.endsWith('*')) {
            const content = match.substring(1, match.length - 1);
            return `<span class="${className}">*${content}*</span>`;
          } else if (match.startsWith('"') && match.endsWith('"')) {
            const content = match.substring(1, match.length - 1);
            return `<span class="${className}">"${content}"</span>`;
          }
          return `<span class="${className}">${match}</span>`;
        });
      });
    
      return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
    };

    // Function to detect and display special in-game events with effects
    const displayGameEvent = (text) => {
      // Check for combat events
      if (text.toLowerCase().includes('attack') || text.toLowerCase().includes('damage')) {
        return <div className="border-l-4 border-red-600 pl-2 my-2 bg-red-900/20 py-1 rounded-r">{highlightKeywords(text)}</div>;
      }
      
      // Check for discovery events
      if (text.toLowerCase().includes('found') || text.toLowerCase().includes('discover')) {
        return <div className="border-l-4 border-yellow-600 pl-2 my-2 bg-yellow-900/20 py-1 rounded-r">{highlightKeywords(text)}</div>;
      }
      
      // Check for location change
      if (text.toLowerCase().includes('enter') || text.toLowerCase().includes('arrived')) {
        return <div className="border-l-4 border-blue-600 pl-2 my-2 bg-blue-900/20 py-1 rounded-r">{highlightKeywords(text)}</div>;
      }
      
      // Default case - still nicely formatted
      return highlightKeywords(text);
    };

    // Split text into paragraphs for better formatting
    const formatGameText = (text) => {
      const paragraphs = text.split(/\n+/);
      return paragraphs.map((paragraph, idx) => (
        <div key={idx} className="mb-3">
          {displayGameEvent(paragraph)}
        </div>
      ));
    };

    return (
      <div className="py-3">
        {message.type === "user" ? (
          <div className="flex items-center text-amber-300 font-medium bg-gray-800/50 p-2 px-4 rounded-full shadow-inner mb-2 w-fit max-w-full animate-fadeIn">
            <span className="mr-2 text-xs bg-amber-800 text-amber-200 p-1 rounded">YOU</span>
            <span>{message.text}</span>
          </div>
        ) : message.type === "error" ? (
          <div className="text-red-400 italic bg-red-900/20 p-3 rounded-md border border-red-800/50 shadow animate-fadeIn">
            ⚠️ {message.text}
          </div>
        ) : (
          <div className="relative">
            {/* Decorative fantasy border */}
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-600 via-amber-700 to-transparent rounded"></div>
            
            <div className="text-green-200 leading-relaxed pl-3 animate-fadeIn">
              {formatGameText(message.text)}
              
              {/* Special effects for important messages */}
              {message.text.toLowerCase().includes('quest') && (
                <div className="bg-amber-900/30 border border-amber-700/50 rounded-md p-3 my-3 shadow-lg">
                  <div className="text-amber-300 font-bold mb-1 flex items-center">
                    <span className="mr-2 text-amber-500">📜</span>
                    NEW QUEST
                  </div>
                  <div className="text-amber-100">
                    {message.text.match(/quest[^.!?]*[.!?]/i) ? 
                      message.text.match(/quest[^.!?]*[.!?]/i)[0] : 
                      "Embark on this new adventure!"}
                  </div>
                </div>
              )}
              
              {message.options?.length > 0 && (
                <div className="mt-4 space-y-2 bg-gray-800/70 p-3 rounded-md border border-gray-700/50">
                  <div className="text-amber-400 font-semibold mb-2">Choose your action:</div>
                  {message.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(option)}
                      className="block w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-left transition-all hover:translate-x-1 flex items-center"
                    >
                      <span className="w-6 h-6 rounded-full bg-amber-800 text-amber-200 flex items-center justify-center mr-2 text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col bg-[url('/api/placeholder/1200/800')] bg-cover bg-fixed bg-center relative">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
      
      {/* Game header */}
      <header className="relative z-10 border-b border-amber-800/50 bg-gradient-to-r from-gray-900/80 to-black/80 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-amber-400 font-serif tracking-wider">⚔️ Realm of Adventures</h1>
          </div>
          
          <div className="flex flex-wrap gap-6 items-center">
            {/* Health bar with animation */}
            <div className="relative">
              <div className="text-red-400 text-sm font-bold mb-1">HEALTH</div>
              <div className="w-32 h-3 bg-gray-800 rounded-full border border-gray-700">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${
                    health > 60 ? 'bg-green-500' : 
                    health > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${health}%` }}
                ></div>
              </div>
              <div className="text-xs mt-1 text-center">{health}/100</div>
            </div>
            
            {/* Location with icon */}
            <div className="text-center px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="text-amber-400 text-sm font-bold flex items-center gap-1">
                <span>📍</span> LOCATION
              </div>
              <div className="text-sm text-gray-200">{location}</div>
            </div>
            
            {/* Sound control */}
            <button className="text-gray-400 hover:text-amber-400 transition-colors p-2 rounded-full bg-gray-800/30 border border-gray-700/50">
              <span className="text-lg">🔊</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main game area */}
      <main className="flex-grow relative z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto h-full flex flex-col md:flex-row gap-6">
          {/* Game content area */}
          <div className="flex-grow flex flex-col h-full">
            {/* Game messages */}
            <div className="flex-grow h-[calc(100vh-280px)] overflow-y-auto p-6 bg-gray-900/80 rounded-lg border border-gray-700/50 shadow-inner font-mono text-sm custom-scrollbar relative bg-[url('/api/placeholder/200/200')] bg-repeat bg-opacity-5">
              {/* Decorative fantasy elements */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-amber-900/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-900/20 to-transparent"></div>
            
              {messages.map((msg, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  {renderMessage(msg)}
                </div>
              ))}
              {isLoading && (
                <div className="py-4 flex justify-center">
                  <div className="p-3 bg-gray-800/80 rounded-lg border border-purple-800/50 flex items-center">
                    <span className="inline-block w-3 h-3 bg-purple-500 rounded-full animate-pulse mr-1"></span>
                    <span className="inline-block w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-150 mr-1"></span>
                    <span className="inline-block w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-300"></span>
                    <span className="ml-3 text-purple-300 italic">The story unfolds...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area */}
            <div className="mt-4 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-gray-800/90 text-amber-100 p-4 pl-10 rounded-lg border border-amber-800/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-lg placeholder-gray-500"
                placeholder="What will you do next, adventurer?"
                disabled={isLoading}
              />
              <span className="absolute left-3 top-4 text-amber-500 font-bold">❯</span>
              <button
                onClick={() => sendCommand()}
                disabled={isLoading}
                className="absolute right-3 top-3 bg-amber-700 hover:bg-amber-600 px-4 py-1 rounded-md text-sm font-bold transition-colors duration-200 shadow-md disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="inline-block animate-pulse">•••</span>
                ) : (
                  "SEND"
                )}
              </button>
            </div>
          </div>
          
          {/* Side panel */}
          <div className="w-full md:w-64 flex flex-col gap-4">
            {/* Inventory */}
            <div className="bg-gray-900/80 rounded-lg border border-gray-700/50 shadow-lg p-4 flex-grow">
              <h3 className="text-amber-400 text-center border-b border-gray-600/50 pb-2 mb-3 font-bold tracking-wider">
                <span className="mr-2">🎒</span>INVENTORY
              </h3>
              <div className="overflow-y-auto max-h-[calc(100vh-400px)] custom-scrollbar">
                {inventory.length > 0 ? (
                  <ul className="space-y-2">
                    {inventory.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2 text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-800/50 transition-colors cursor-pointer">
                        <span className="text-amber-500 text-lg">•</span> {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-gray-500 italic text-center">
                    <span className="text-2xl mb-2">💼</span>
                    <p>Your bag is empty</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Quick commands */}
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => sendCommand("A")}
                className="bg-gray-800/80 hover:bg-gray-700/80 text-sm p-3 rounded-md text-gray-300 hover:text-white border border-gray-700/30 transition-all hover:border-amber-800/50 flex items-center justify-center gap-1 shadow-md"
              >
                <span>🅰️</span> A
              </button>
              <button 
                onClick={() => sendCommand("B")}
                className="bg-gray-800/80 hover:bg-gray-700/80 text-sm p-3 rounded-md text-gray-300 hover:text-white border border-gray-700/30 transition-all hover:border-amber-800/50 flex items-center justify-center gap-1 shadow-md"
              >
                <span>🅱️</span> B
              </button>
              <button 
                onClick={() => sendCommand("C")}
                className="bg-gray-800/80 hover:bg-gray-700/80 text-sm p-3 rounded-md text-gray-300 hover:text-white border border-gray-700/30 transition-all hover:border-amber-800/50 flex items-center justify-center gap-1 shadow-md"
              >
                <span>©️</span> C
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 mt-auto border-t border-gray-800 bg-black/80 py-2 text-center text-xs text-gray-500">
        <p>Realm of Adventures © 2025 | Use arrow keys to navigate history | Type 'help' for commands</p>
      </footer>
      
      {/* Add some ambient animation effects */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        /* Custom scrollbar for a more themed look */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(180, 120, 40, 0.6);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 150, 50, 0.8);
        }
      `}</style>
    </div>
  );
};

export default AdventureGame;