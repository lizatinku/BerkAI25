
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Shield, AlertTriangle, Volume2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const EmailPhishingDetection = () => {
  const navigate = useNavigate();
  const [emailContent, setEmailContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    isPhishing: boolean;
    confidence: number;
    type: string;
    explanation: string;
  } | null>(null);

  const handleAnalyzeEmail = () => {
    if (!emailContent.trim()) return;
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        isPhishing: true,
        confidence: 94,
        type: 'Banking Phishing',
        explanation: 'This email impersonates a bank and contains suspicious links designed to steal login credentials.'
      });
    }, 2500);
  };

  const samplePhishingEmail = `Subject: URGENT: Your Account Will Be Suspended

Dear Customer,

We have detected suspicious activity on your account. Your account will be suspended within 24 hours unless you verify your information immediately.

Click here to verify: http://fake-bank-security.com/verify

Failure to complete verification will result in permanent account closure.

Best regards,
Security Team
YourBank`;

  const loadSampleEmail = () => {
    setEmailContent(samplePhishingEmail);
  };

  const playPhisherVoice = () => {
    console.log('Playing phisher voice explanation...');
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
        <h1 className="text-lg font-semibold">Email Phishing Detection</h1>
        <div className="w-8" />
      </div>

      <div className="p-6 space-y-6">
        {/* Email Input Section */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="w-6 h-6 text-purple-600" />
            <h2 className="text-lg font-semibold">Analyze Email Content</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Paste email content or subject line
              </label>
              <Textarea
                placeholder="Paste the suspicious email content here..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="input-field min-h-32 resize-none"
                rows={6}
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleAnalyzeEmail}
                disabled={!emailContent.trim() || isAnalyzing}
                className={`flex-1 ${isAnalyzing ? 'security-button opacity-50' : 'security-button'}`}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Email'}
              </Button>
              
              <Button
                onClick={loadSampleEmail}
                variant="outline"
                size="sm"
                className="px-3"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
            </div>
            <h3 className="font-semibold mb-2">Analyzing Email</h3>
            <p className="text-slate-600 text-sm">Checking for phishing patterns and suspicious content...</p>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-4">
            <Card className={`p-6 ${
              analysisResult.isPhishing ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  analysisResult.isPhishing ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  {analysisResult.isPhishing ? (
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  ) : (
                    <Shield className="w-6 h-6 text-green-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 ${
                    analysisResult.isPhishing ? 'text-red-800' : 'text-green-800'
                  }`}>
                    {analysisResult.isPhishing ? 'PHISHING DETECTED' : 'EMAIL IS SAFE'}
                  </h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className={`${analysisResult.isPhishing ? 'text-red-700' : 'text-green-700'}`}>
                      <span className="font-medium">Confidence: </span>
                      {analysisResult.confidence}%
                    </div>
                    
                    {analysisResult.isPhishing && (
                      <div className="text-red-700">
                        <span className="font-medium">Type: </span>
                        {analysisResult.type}
                      </div>
                    )}
                  </div>
                  
                  <p className={`mt-3 text-sm ${
                    analysisResult.isPhishing ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {analysisResult.explanation}
                  </p>
                </div>
              </div>
            </Card>

            {/* Voice Playback Options */}
            {analysisResult.isPhishing && (
              <Card className="p-6">
                <h4 className="font-medium mb-3">Audio Explanation:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={playPhisherVoice}
                    className="flex items-center space-x-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Phisher Tactics</span>
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
              </Card>
            )}

            {/* Red Flags Identified */}
            {analysisResult.isPhishing && (
              <Card className="p-6 bg-amber-50 border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-3">Red Flags Identified:</h4>
                <ul className="space-y-2 text-sm text-amber-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                    <span>Urgent language creating false urgency</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                    <span>Suspicious link that doesn't match the claimed sender</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                    <span>Generic greeting instead of personal information</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                    <span>Threats of account suspension</span>
                  </li>
                </ul>
              </Card>
            )}
          </div>
        )}

        {/* Email Safety Tips */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-3">Email Safety Checklist</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span>Check the sender's email address carefully</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span>Hover over links to see the real destination</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span>Be wary of urgent or threatening language</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span>Contact companies directly through official channels</span>
            </li>
          </ul>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => {
              setEmailContent('');
              setAnalysisResult(null);
            }}
            variant="outline"
            className="w-full"
          >
            Analyze Another Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailPhishingDetection;
