
import React, { useState } from 'react';
import { Phone, Shield, AlertTriangle, Volume2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const ScamCallWidget = () => {
  const navigate = useNavigate();
  const [callStatus, setCallStatus] = useState<'analyzing' | 'safe' | 'scam'>('analyzing');

  // Simulate analysis completion
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCallStatus('scam');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mobile-container bg-slate-900 text-white">
      {/* Widget Header - Compact for Control Center */}
      <div className="p-4 bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-3xl">
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold">PhishFilter</span>
          </div>
          <div className="w-8" />
        </div>
      </div>

      {/* Real-time Call Status */}
      <div className="p-6">
        <Card className="bg-slate-800 border-slate-700 p-6 text-center">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
            callStatus === 'analyzing' ? 'bg-blue-900' : 
            callStatus === 'scam' ? 'bg-red-900' : 'bg-green-900'
          }`}>
            {callStatus === 'analyzing' ? (
              <div className="animate-pulse">
                <Phone className="w-10 h-10 text-blue-400" />
              </div>
            ) : callStatus === 'scam' ? (
              <AlertTriangle className="w-10 h-10 text-red-400" />
            ) : (
              <Shield className="w-10 h-10 text-green-400" />
            )}
          </div>

          <div className="mb-6">
            {callStatus === 'analyzing' && (
              <>
                <h2 className="text-xl font-bold text-blue-400 mb-2">Analyzing Call</h2>
                <p className="text-slate-300 text-sm">Scanning for scam patterns...</p>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
                  <div className="bg-blue-400 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                </div>
              </>
            )}
            
            {callStatus === 'scam' && (
              <>
                <h2 className="text-xl font-bold text-red-400 mb-2">⚠️ SCAM DETECTED</h2>
                <p className="text-slate-300 text-sm mb-3">IRS Tax Scam - Do not provide information</p>
                <div className="bg-red-900/50 border border-red-700 rounded-lg p-3 mb-4">
                  <p className="text-red-200 text-xs">
                    This caller is impersonating the IRS. Hang up immediately.
                  </p>
                </div>
              </>
            )}

            {callStatus === 'safe' && (
              <>
                <h2 className="text-xl font-bold text-green-400 mb-2">✓ Call is Safe</h2>
                <p className="text-slate-300 text-sm">No scam patterns detected</p>
              </>
            )}
          </div>

          {/* Quick Actions */}
          {callStatus !== 'analyzing' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="sm"
                  className="bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Scammer
                </Button>
                <Button
                  size="sm"
                  className="bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Calm Voice
                </Button>
              </div>
              
              <Button
                onClick={() => navigate('/post-call-report')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                View Full Report
              </Button>
            </div>
          )}
        </Card>

        {/* Widget Instructions */}
        <Card className="mt-4 bg-slate-800 border-slate-700 p-4">
          <h3 className="font-semibold text-slate-200 mb-2 text-sm">Control Center Setup</h3>
          <ol className="text-xs text-slate-400 space-y-1">
            <li>1. Open Control Center settings</li>
            <li>2. Tap "+" next to PhishFilter</li>
            <li>3. Access during calls for instant protection</li>
          </ol>
        </Card>
      </div>
    </div>
  );
};

export default ScamCallWidget;
