import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Mic, Square, MapPin, Upload, Search, Music, Clock, Cloud, Users, User, CreditCard, ChevronDown, Check } from 'lucide-react';
import AIOrb from './AIOrb';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const timesOfDay = ["Sunrise", "Morning", "Afternoon", "Sunset", "Evening", "Late night"];
const weathers = ["Clear sunny", "Cloudy sunny", "Grey cloudy", "Light rain", "Heavy rain", "Light snow", "Heavy snow"];
const musicGenres = ["Classical", "Jazz", "Ambient / Nature", "Acoustic Folk", "Cinematic Orchestral", "Soft Pop", "Lo-Fi Beats", "Piano Solo"];
const genders = ["Female", "Male", "Non-binary", "Prefer not to say"];

// --- Location Data ---
const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan", "China", "India", "Brazil",
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cambodia", "Cameroon", "Cape Verde", "Central African Republic", "Chad", "Chile", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia",
  "Fiji", "Finland", "Gabon", "Gambia", "Georgia", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway",
  "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"
];

const CANADA_PROVINCES = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"
];

const UK_REGIONS = [
  "East Midlands", "East of England", "London", "North East", "North West", "Northern Ireland", "Scotland", "South East", "South West", "Wales", "West Midlands", "Yorkshire and the Humber"
];

interface PersonDetails {
  id: number;
  name: string;
  age: string;
  gender: string;
  relationship: string;
  appearance: string;
  clothing: string;
  image: string | null;
}

interface FormData {
  // Personal Details
  userName: string;
  userEmail: string;
  userCountry: string;
  userState: string;
  // Story Details
  story: string;
  dateMonth: string;
  dateYear: string;
  location: string;
  locationNotes: string;
  timeOfDay: string;
  weather: string;
  peopleCount: number;
  people: PersonDetails[];
  interactions: string;
  emotions: string;
  pov: 'First Person' | 'Third Person' | '';
  // selfDescription removed as it's now part of people[0]
  keyDetails: string;
  sounds: string;
  musicGenre: string;
}

const initialPerson: PersonDetails = {
  id: 0, name: '', age: '', gender: '', relationship: '', appearance: '', clothing: '', image: null
};

const initialFormData: FormData = {
  userName: '', userEmail: '', userCountry: '', userState: '',
  story: '', dateMonth: 'January', dateYear: '2010', location: '', locationNotes: '', timeOfDay: '', weather: '',
  peopleCount: 1,
  people: [],
  interactions: '',
  emotions: '', pov: '', keyDetails: '', sounds: '', musicGenre: ''
};

const AudioRecorder = ({ onTranscribe, maxMinutes }: { onTranscribe: (text: string) => void, maxMinutes: number }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setSeconds(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRecording]);

  useEffect(() => {
    if (seconds >= maxMinutes * 60) stopRecording();
  }, [seconds]);

  const startRecording = () => setIsRecording(true);
  
  const stopRecording = () => {
    setIsRecording(false);
    setTimeout(() => {
      onTranscribe(" [Transcribed Audio]: It was a really vivid moment. I remember the colors being incredibly bright and the feeling of warmth...");
    }, 500);
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all shadow-sm ${
          isRecording 
          ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' 
          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
        }`}
      >
        {isRecording ? <Square className="w-4 h-4 fill-current" /> : <Mic className="w-4 h-4" />}
        {isRecording ? 'Stop' : 'Record'}
      </button>
      {isRecording && <span className="text-sm font-mono text-red-500 font-medium">{formatTime(seconds)} / {maxMinutes}:00</span>}
    </div>
  );
};

// --- Helper Component for Searchable Select ---
const SearchableSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder 
}: { 
  options: string[], 
  value: string, 
  onChange: (val: string) => void, 
  placeholder: string 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredOptions(
      options.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, options]);

  useEffect(() => {
    // Sync internal search term if external value changes (and it matches an option)
    if (value && options.includes(value)) {
        // We don't necessarily want to change search term on value change if menu is closed,
        // but if we are editing, we want the input to reflect value.
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // If the current search term isn't a valid option, reset to current value or empty
        if (!options.includes(searchTerm) && value) {
            // Optional: reset search to value
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef, options, searchTerm, value]);

  const handleSelect = (option: string) => {
    onChange(option);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div 
        className="w-full p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between cursor-text focus-within:ring-2 focus-within:ring-blue-100"
        onClick={() => setIsOpen(true)}
      >
        <input 
            type="text"
            className="w-full h-full bg-transparent outline-none text-slate-900 placeholder-slate-400"
            placeholder={value || placeholder}
            value={isOpen ? searchTerm : (value || '')}
            onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
        />
        <ChevronDown className="w-4 h-4 text-slate-400 ml-2 flex-shrink-0" />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                    <div 
                        key={opt} 
                        className={`px-4 py-3 cursor-pointer hover:bg-blue-50 text-sm ${value === opt ? 'bg-blue-50 font-medium text-blue-900' : 'text-slate-700'}`}
                        onClick={() => handleSelect(opt)}
                    >
                        {opt}
                    </div>
                ))
            ) : (
                <div className="px-4 py-3 text-sm text-slate-400 italic">No matches found</div>
            )}
        </div>
      )}
    </div>
  );
};

interface IntakeWizardProps {
  onReturnHome: () => void;
  onGoToPayment: (data: FormData) => void;
  logoSrc: string;
  initialEmail?: string;
}

const IntakeWizard: React.FC<IntakeWizardProps> = ({ onReturnHome, onGoToPayment, logoSrc, initialEmail }) => {
  const [step, setStep] = useState(1);
  const [personIndex, setPersonIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    if (initialEmail) {
      setFormData(prev => ({ ...prev, userEmail: initialEmail }));
    }
  }, [initialEmail]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, personIndex]);

  const updateData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Reset state when country changes
  useEffect(() => {
     // If country changes, check if state needs reset
     const isUS = formData.userCountry === "United States";
     const isUK = formData.userCountry === "United Kingdom";
     const isCA = formData.userCountry === "Canada";
     
     if (!isUS && !isUK && !isCA) {
         // Keep existing state value if it's text, but if we switched from a dropdown country to a text country, might want to clear it? 
         // For now, let's just leave it, user can edit.
     } else {
         // If switched between dropdown countries, might need to clear if value is invalid for new country
         if (isUS && !US_STATES.includes(formData.userState)) updateData('userState', '');
         if (isUK && !UK_REGIONS.includes(formData.userState)) updateData('userState', '');
         if (isCA && !CANADA_PROVINCES.includes(formData.userState)) updateData('userState', '');
     }
  }, [formData.userCountry]);

  const updatePersonData = (field: keyof PersonDetails, value: any) => {
    const newPeople = [...formData.people];
    if (!newPeople[personIndex]) newPeople[personIndex] = { ...initialPerson, id: personIndex };
    newPeople[personIndex] = { ...newPeople[personIndex], [field]: value };
    updateData('people', newPeople);
  };

  const totalSteps = 14;

  const nextStep = () => {
    if (step === 8) {
      if (personIndex < formData.peopleCount - 1) {
        setPersonIndex(prev => prev + 1);
        return;
      }
    }
    if (step === 7) {
       const initialPeopleArray = Array(formData.peopleCount).fill(null).map((_, i) => ({...initialPerson, id: i}));
       // Pre-fill person 0 (self) with user's name if available
       if (formData.userName) {
           initialPeopleArray[0].name = formData.userName;
       }
       setFormData(prev => ({...prev, people: initialPeopleArray}));
       setPersonIndex(0);
    }
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      // Completed, go to payment
      onGoToPayment(formData);
    }
  };

  const prevStep = () => {
    if (step === 8) {
      if (personIndex > 0) {
        setPersonIndex(prev => prev - 1);
        return;
      }
    }
    if (step > 1) setStep(prev => prev - 1);
  };

  const renderContent = () => {
    switch (step) {
      case 1: 
        const isUS = formData.userCountry === "United States";
        const isUK = formData.userCountry === "United Kingdom";
        const isCA = formData.userCountry === "Canada";
        const hasStateDropdown = isUS || isUK || isCA;
        
        let stateLabel = "Region";
        if (isUS) stateLabel = "State";
        if (isUK) stateLabel = "Region";
        if (isCA) stateLabel = "Province";

        return (
          <>
            <h2 className="text-3xl font-serif text-slate-900 mb-6 text-center">Let's start with a few details about you.</h2>
            <div className="space-y-4 w-full max-w-lg mx-auto">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">Your Name</label>
                <input 
                  type="text"
                  value={formData.userName}
                  onChange={(e) => updateData('userName', e.target.value)}
                  placeholder="Full Name"
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">Email</label>
                <input 
                  type="email"
                  value={formData.userEmail}
                  onChange={(e) => updateData('userEmail', e.target.value)}
                  placeholder="your@email.com"
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
              
              {/* Country & State Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">Country</label>
                    <SearchableSelect 
                        options={COUNTRIES}
                        value={formData.userCountry}
                        onChange={(val) => updateData('userCountry', val)}
                        placeholder="Select Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">{stateLabel}</label>
                    {hasStateDropdown ? (
                        <div className="relative">
                            <select 
                                value={formData.userState}
                                onChange={(e) => updateData('userState', e.target.value)}
                                className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Select {stateLabel}</option>
                                {isUS && US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                {isUK && UK_REGIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                {isCA && CANADA_PROVINCES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    ) : (
                        <input 
                            type="text"
                            value={formData.userState}
                            onChange={(e) => updateData('userState', e.target.value)}
                            placeholder={`Enter ${stateLabel}`}
                            className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                    )}
                  </div>
              </div>

            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-3xl font-serif text-slate-900 mb-6 text-center">Can you tell us, in your own words, about the memory you’d like to revisit?</h2>
            <textarea
              value={formData.story}
              onChange={(e) => updateData('story', e.target.value)}
              className="w-full h-48 p-4 bg-white border border-slate-200 rounded-2xl text-lg resize-none focus:ring-2 focus:ring-blue-100 outline-none mb-4"
              placeholder="Start simply: 'It was a sunny day at the beach...'"
              maxLength={1000}
            />
            <div className="flex justify-between items-center w-full">
              <span className="text-xs text-slate-400">{formData.story.length}/1000 characters</span>
              <AudioRecorder onTranscribe={(txt) => updateData('story', formData.story + txt)} maxMinutes={3} />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-3xl font-serif text-slate-900 mb-6 text-center">Roughly when did this memory take place?</h2>
            <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto w-full">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">Month</label>
                <select 
                  value={formData.dateMonth}
                  onChange={(e) => updateData('dateMonth', e.target.value)}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                >
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">Year</label>
                 <input 
                  type="number"
                  value={formData.dateYear}
                  onChange={(e) => updateData('dateYear', e.target.value)}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
             <h2 className="text-3xl font-serif text-slate-900 mb-2 text-center">Where exactly did this memory unfold?</h2>
             <p className="text-slate-500 text-center mb-8">Search for the area, city, or postcode.</p>
             <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm mb-6 w-full">
                <div className="relative mb-4">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                   <input 
                    type="text" 
                    placeholder="Search location (e.g. Central Park, NY)"
                    value={formData.location}
                    onChange={(e) => updateData('location', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100"
                   />
                </div>
                <div className="relative w-full h-64 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200 group">
                   <div className="absolute inset-0 bg-[url('https://picsum.photos/800/400?grayscale')] opacity-30 bg-cover bg-center"></div>
                   <div className="relative z-10 flex flex-col items-center text-slate-500">
                      <MapPin className="w-12 h-12 text-red-500 drop-shadow-lg mb-2 animate-bounce" />
                      <span className="text-xs font-semibold bg-white/80 px-2 py-1 rounded shadow-sm">Drag pin to adjust</span>
                   </div>
                   <button className="absolute bottom-4 right-4 bg-white px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-slate-700 hover:bg-slate-50">
                     Street View
                   </button>
                </div>
             </div>
             <textarea
              value={formData.locationNotes}
              onChange={(e) => updateData('locationNotes', e.target.value)}
              className="w-full h-24 p-4 bg-white border border-slate-200 rounded-xl text-base resize-none focus:ring-2 focus:ring-blue-100 outline-none"
              placeholder="Specific notes (e.g. near the large oak tree, by the red bench...)"
            />
          </>
        );
      case 5:
        return (
          <>
            <h2 className="text-3xl font-serif text-slate-900 mb-8 text-center">What time of day was it?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {timesOfDay.map(time => (
                <button
                  key={time}
                  onClick={() => updateData('timeOfDay', time)}
                  className={`p-6 rounded-2xl border text-center transition-all ${
                    formData.timeOfDay === time 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <Clock className={`w-6 h-6 mx-auto mb-3 ${formData.timeOfDay === time ? 'text-blue-300' : 'text-slate-400'}`} />
                  <span className="font-medium">{time}</span>
                </button>
              ))}
            </div>
          </>
        );
      case 6:
         return (
          <>
            <h2 className="text-3xl font-serif text-slate-900 mb-8 text-center">What was the weather like?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {weathers.map(w => (
                <button
                  key={w}
                  onClick={() => updateData('weather', w)}
                  className={`p-6 rounded-2xl border text-center transition-all ${
                    formData.weather === w
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <Cloud className={`w-6 h-6 mx-auto mb-3 ${formData.weather === w ? 'text-blue-300' : 'text-slate-400'}`} />
                  <span className="font-medium">{w}</span>
                </button>
              ))}
            </div>
          </>
        );
      case 7: 
        return (
          <>
            <div className="text-center mb-10">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Section 2</span>
              <h2 className="text-3xl font-serif text-slate-900">Let's talk about the people involved.</h2>
              <p className="text-slate-500 mt-2">How many people were present, <strong>including yourself</strong>? (Up to 4)</p>
            </div>
            <div className="flex justify-center gap-6">
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  onClick={() => updateData('peopleCount', num)}
                  className={`w-20 h-20 rounded-2xl text-2xl font-bold flex items-center justify-center transition-all ${
                    formData.peopleCount === num
                    ? 'bg-slate-900 text-white shadow-xl scale-110'
                    : 'bg-white text-slate-400 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </>
        );
      case 8:
        const person = formData.people[personIndex] || initialPerson;
        const isSelf = personIndex === 0;

        return (
          <>
            <div className="flex items-center justify-between mb-6 w-full">
              <h2 className="text-2xl font-serif text-slate-900">
                {isSelf ? "Tell us about yourself" : `Person ${personIndex + 1} of ${formData.peopleCount}`}
              </h2>
              <div className="flex gap-1">
                {Array(formData.peopleCount).fill(0).map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i === personIndex ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                ))}
              </div>
            </div>
            
            {isSelf && (
                <p className="text-slate-500 mb-6 text-center text-sm">Describe your appearance and what you were wearing in this memory.</p>
            )}

            <div className="space-y-5 w-full">
               <div className="grid grid-cols-2 gap-4">
                 <input 
                   type="text" 
                   placeholder="Name" 
                   value={person.name}
                   onChange={e => updatePersonData('name', e.target.value)}
                   className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none"
                 />
                 <input 
                   type="text" 
                   placeholder="Age (approx)" 
                   value={person.age}
                   onChange={e => updatePersonData('age', e.target.value)}
                   className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none"
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <select 
                   value={person.gender}
                   onChange={e => updatePersonData('gender', e.target.value)}
                   className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                 >
                   <option value="">Select Gender</option>
                   {genders.map(g => <option key={g} value={g}>{g}</option>)}
                 </select>
                 
                 {!isSelf && (
                    <input 
                      type="text" 
                      placeholder="Relationship to you" 
                      value={person.relationship}
                      onChange={e => updatePersonData('relationship', e.target.value)}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                 )}
                 {isSelf && <div className="hidden md:block"></div>}
               </div>

               <textarea 
                  placeholder={isSelf ? "Appearance description (hair style, facial features...)" : "Appearance description (hair, height, distinct features...)"}
                  value={person.appearance}
                  onChange={e => updatePersonData('appearance', e.target.value)}
                  className="w-full h-24 p-3 bg-white border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-100 outline-none"
               />
               <input 
                   type="text" 
                   placeholder={isSelf ? "What were you wearing? (colors, style...)" : "Clothing details (colors, style...)"} 
                   value={person.clothing}
                   onChange={e => updatePersonData('clothing', e.target.value)}
                   className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none"
               />
               <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-white transition-colors cursor-pointer group">
                  <Upload className="w-8 h-8 text-slate-300 group-hover:text-blue-500 mb-2" />
                  <span className="text-sm text-slate-500 font-medium">Upload photo of {isSelf ? "yourself" : "this person"} (Optional)</span>
               </div>
            </div>
          </>
        );
      case 9:
        return (
          <>
            <h2 className="text-3xl font-serif text-slate-900 mb-6 text-center">What was happening?</h2>
            <p className="text-slate-500 text-center mb-6 max-w-lg mx-auto">Describe how these characters were interacting with one another.</p>
            <textarea
              value={formData.interactions}
              onChange={(e) => updateData('interactions', e.target.value)}
              className="w-full h-48 p-4 bg-white border border-slate-200 rounded-2xl text-lg resize-none focus:ring-2 focus:ring-blue-100 outline-none mb-4"
              placeholder="They were laughing and sharing a meal..."
              maxLength={1000}
            />
             <div className="flex justify-between items-center w-full">
              <span className="text-xs text-slate-400">{formData.interactions.length}/1000 characters</span>
              <AudioRecorder onTranscribe={(txt) => updateData('interactions', formData.interactions + txt)} maxMinutes={3} />
            </div>
          </>
        );
      case 10:
         return (
          <>
            <div className="text-center mb-6">
               <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Section 3</span>
               <h2 className="text-3xl font-serif text-slate-900">Contextualization</h2>
            </div>
            <p className="text-slate-900 font-medium text-lg mb-4 text-center">How were you feeling and acting?</p>
            <textarea
              value={formData.emotions}
              onChange={(e) => updateData('emotions', e.target.value)}
              className="w-full h-32 p-4 bg-white border border-slate-200 rounded-2xl resize-none focus:ring-2 focus:ring-blue-100 outline-none mb-4"
              placeholder="I felt anxious but excited..."
            />
            <div className="flex justify-end w-full">
               <AudioRecorder onTranscribe={(txt) => updateData('emotions', formData.emotions + txt)} maxMinutes={1} />
            </div>
          </>
        );
      case 11: 
        return (
          <>
            <h2 className="text-3xl font-serif text-slate-900 mb-8 text-center">Visual Perspective</h2>
            <div className="grid md:grid-cols-2 gap-6 w-full">
              {['First Person (POV)', 'Third Person'].map((opt) => (
                 <button
                 key={opt}
                 onClick={() => updateData('pov', opt)}
                 className={`p-8 rounded-2xl border text-center transition-all ${
                   formData.pov === opt
                   ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                   : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:shadow-md'
                 }`}
               >
                 {opt === 'First Person (POV)' ? <User className="w-8 h-8 mx-auto mb-4" /> : <Users className="w-8 h-8 mx-auto mb-4" />}
                 <span className="font-bold text-lg block">{opt}</span>
                 <span className="text-xs opacity-70 mt-2 block">
                   {opt === 'First Person (POV)' ? "See through your own eyes" : "See yourself in the scene"}
                 </span>
               </button>
              ))}
            </div>
          </>
        );
      // Case 12 removed (Describe yourself in that moment) - merged into step 8
      case 12:
        return (
          <>
            <h2 className="text-3xl font-serif text-slate-900 mb-6 text-center">Any particular details that stood out?</h2>
            <textarea
              value={formData.keyDetails}
              onChange={(e) => updateData('keyDetails', e.target.value)}
              className="w-full h-56 p-4 bg-white border border-slate-200 rounded-2xl resize-none focus:ring-2 focus:ring-blue-100 outline-none mb-4"
              placeholder="The way the light hit the table, the specific pattern on the rug..."
              maxLength={1500}
            />
             <div className="flex justify-between items-center w-full">
              <span className="text-xs text-slate-400">{formData.keyDetails.length}/1500 characters</span>
              <AudioRecorder onTranscribe={(txt) => updateData('keyDetails', formData.keyDetails + txt)} maxMinutes={3} />
            </div>
          </>
        );
      case 13: 
        return (
          <>
            <h2 className="text-3xl font-serif text-slate-900 mb-6 text-center">Background Sounds</h2>
            <textarea
              value={formData.sounds}
              onChange={(e) => updateData('sounds', e.target.value)}
              className="w-full h-32 p-4 bg-white border border-slate-200 rounded-2xl resize-none focus:ring-2 focus:ring-blue-100 outline-none"
              placeholder="Distant traffic, birds chirping, waves crashing..."
            />
          </>
        );
      case 14:
        return (
           <>
            <h2 className="text-3xl font-serif text-slate-900 mb-8 text-center">Atmospheric Music</h2>
            <div className="grid grid-cols-2 gap-4 w-full">
              {musicGenres.map(genre => (
                <button
                  key={genre}
                  onClick={() => updateData('musicGenre', genre)}
                  className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    formData.musicGenre === genre
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Music className="w-4 h-4 opacity-50" />
                  <span className="font-medium text-sm">{genre}</span>
                </button>
              ))}
            </div>
           </>
        );
      default:
        return <div>Unknown Step</div>;
    }
  };

  const getOrbText = () => {
    if (step === 1) return "Welcome. To help us personalize your experience, please confirm your details.";
    if (step === 2) return "Can you tell us, in your own words, about the memory you’d like to revisit?";
    if (step === 3) return "Can you tell us roughly when this memory took place? What month and year was it?";
    if (step === 4) return "Where exactly did this memory unfold?";
    if (step === 5) return "What time of day was it when this memory happened?";
    if (step === 6) return "What was the weather like during this memory?";
    if (step === 7) return "How many people were present, including yourself?";
    if (step === 8) {
        if (personIndex === 0) return "Tell us about yourself. What did you look like and what were you wearing?";
        return "Please tell us about this person and your relationship with them.";
    }
    if (step === 9) return "Now, tell us what was happening in the scene and how everyone was interacting.";
    if (step === 10) return "How were you feeling and acting in the scene?";
    if (step === 11) return "Would you prefer to see the scene from first-person or third-person?";
    // Step 12 is now Key Details
    if (step === 12) return "Were there any particular details that really stood out to you, and why?";
    if (step === 13) return "Were there any background sounds, noises, or animals?";
    if (step === 14) return "What genre of music best reflects the atmosphere of this scene?";
    return "";
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-200/40 rounded-full blur-[100px]"></div>
      </div>

      <header className="fixed top-0 left-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 h-24 transition-all">
        <div className="max-w-4xl mx-auto px-6 h-full flex items-center justify-between relative">
          <button onClick={onReturnHome} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 z-20">
            Exit
          </button>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
             <AIOrb textToSpeak={getOrbText()} />
          </div>
          <div className="w-24 flex justify-end z-20">
            <img src={logoSrc} alt="Solim Logo" className="h-10 w-auto object-contain" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100">
          <div 
            className="h-full bg-slate-900 transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </header>

      <main className="flex-grow pt-36 pb-32 px-6 relative z-10 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/40 min-h-[400px] flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-500 w-full">
             {renderContent()}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-100 p-6 z-40">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              step === 1 
              ? 'opacity-0 pointer-events-none' 
              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          <button 
            onClick={nextStep}
            className="bg-slate-900 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-slate-800 hover:scale-105 transition-all flex items-center gap-2"
          >
            {step === totalSteps ? (
              <>Go to Payment <CreditCard className="w-5 h-5" /></>
            ) : (
              <>Next <ChevronRight className="w-5 h-5" /></>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default IntakeWizard;