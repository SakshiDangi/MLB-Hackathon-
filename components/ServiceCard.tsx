import Service from './ui/service';
import './animate.css'

export default function ServiceCard() {
    const services = [
        { name: 'Personalized fan highlights', description: 'Select your favorite teams and players to receive customized highlight reels after each game.' },
        { name: 'Real-time Tool Tips', description: 'Get instant insights and strategy explanations during live games.' },
        { name: 'Statcast Data Extraction', description: 'Upload Game videos and extract valuable statcast data for in-depth analysis.' },
        { name: 'Prospect Prediction', description: 'Use our AI-powered tool to predict the potential of rising baseball stars.' },
      ];
  return (
    <div className="flex flex-row justify-center items-center my-12 mx-40 pt-4 gap-4 max-w-[100%] animate-slide">
      {services.map((service, index) => (
        <Service key={index} serviceName={service.description} icon={service.name} />
      ))}    
    </div>
  )
  
}
