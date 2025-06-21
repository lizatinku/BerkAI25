
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Shield, Volume2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ScamCallDetection = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [callStatus, setCallStatus] = useState<'safe' | 'scam' | null>(null);

  const handleAnalyzeCall = () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setCallStatus('scam'); // Demo: showing scam detection
    }, 3000);
  };

  const playScammerVoice = () => {
    console.log('Playing scammer voice recording...');
  };

  const playCalmVoice = () => {
    console.log('Playing calm voice explanation...');
  };

  return (
    <div className="mobile-container">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white border-b border-slate-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="text-slate-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">Scam Call Detection</h1>
        <div className="w-8" />
      </div>

      <div className="p-6 space-y-6">
        {/* Current Call Status */}
        <Card className="p-6 text-center">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
            isAnalyzing ? 'bg-blue-100' : 
            callStatus === 'scam' ? 'bg-red-100' : 
            callStatus === 'safe' ? 'bg-green-100' : 'bg-slate-100'
          }`}>
            {isAnalyzing ? (
              <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
            ) : callStatus === 'scam' ? (
              <AlertTriangle className="w-8 h-8 text-red-600" />
            ) : callStatus === 'safe' ? (
              <Shield className="w-8 h-8 text-green-600" />
            ) : (
              <Phone className="w-8 h-8 text-slate-600" />
            )}
          </div>
          
          <h2 className="text-xl font-semibold mb-2">
            {isAnalyzing ? 'Analyzing Call...' : 
             callStatus === 'scam' ? 'SCAM DETECTED' :
             callStatus === 'safe' ? 'Call is Safe' : 'Ready to Analyze'}
          </h2>
          
          <p className="text-slate-600 text-sm mb-4">
            {isAnalyzing ? 'Please wait while we analyze the call patterns' :
             callStatus === 'scam' ? 'This call shows signs of a known scam pattern' :
             callStatus === 'safe' ? 'This call appears to be legitimate' :
             'Tap the button below to start real-time analysis'}
          </p>

          {!analysisComplete && (
            <Button
              onClick={handleAnalyzeCall}
              disabled={isAnalyzing}
              className={`w-full ${isAnalyzing ? 'security-button opacity-50' : 'security-button'}`}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Call'}
            </Button>
          )}
        </Card>

        {/* Analysis Results */}
        {analysisComplete && callStatus && (
          <div className="space-y-4">
            <Card className={`p-6 ${callStatus === 'scam' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
              <h3 className="font-semibold mb-3">
                {callStatus === 'scam' ? 'Scam Type: IRS Tax Scam' : 'Verification Complete'}
              </h3>
              <p className="text-sm text-slate-700 mb-4">
                {callStatus === 'scam' 
                  ? 'The caller is impersonating the IRS and requesting immediate payment. The IRS never calls demanding immediate payment or threatening arrest.'
                  : 'All call patterns match legitimate business practices. No red flags detected.'
                }
              </p>
              
              {/* Voice Playback Options */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Audio Playback:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={playScammerVoice}
                    className="flex items-center space-x-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Scammer Voice</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={playCalmVoice}
                    className="flex items-center space-x-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Calm Explanation</span>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/post-call-report')}
                className="w-full security-button"
              >
                View Detailed Report
              </Button>
              
              <Button
                onClick={() => {
                  setAnalysisComplete(false);
                  setCallStatus(null);
                }}
                variant="outline"
                className="w-full"
              >
                Analyze Another Call
              </Button>
            </div>
          </div>
        )}

        {/* Call Tips */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold mb-3 text-blue-800">Quick Safety Tips</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span>Never give personal information to unsolicited callers</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span>Government agencies don't threaten immediate arrest</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span>Hang up and call the official number directly</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ScamCallDetection;
