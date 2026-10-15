import { useState } from 'react';
import DisclaimerGate from './screens/DisclaimerGate';
import HomePage from './screens/HomePage';
import Wizard from './screens/Wizard';
import Definitions from './screens/Definitions';
import Appendix from './screens/Appendix';
import References from './screens/References';
import AboutUs from './screens/AboutUs';

export type Route = 'home' | 'wizard' | 'definitions' | 'appendix' | 'references' | 'about';

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [route, setRoute] = useState<Route>('home');

  if (!accepted) return <DisclaimerGate onAccept={() => setAccepted(true)} />;

  return (
    <div className="mx-auto flex min-h-full max-w-md flex-col bg-slate-50">
      {route === 'home' && <HomePage onNavigate={setRoute} />}
      {route === 'wizard' && <Wizard onHome={() => setRoute('home')} />}
      {route === 'definitions' && <Definitions onBack={() => setRoute('home')} />}
      {route === 'appendix' && <Appendix onBack={() => setRoute('home')} />}
      {route === 'references' && <References onBack={() => setRoute('home')} />}
      {route === 'about' && <AboutUs onBack={() => setRoute('home')} />}
    </div>
  );
}
