
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Shield, CheckCircle, Phone, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const PostCallReport = () => {
  const navigate = useNavigate();

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
        <h1 className="text-lg font-semibold">Call Report</h1>
        <div className="w-8" />
      </div>

      <div className="p-6 space-y-6">
        {/* Call Summary */}
        <Card className="p-6 bg-red-50 border-red-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-red-800 mb-2">SCAM DETECTED</h2>
              <p className="text-red-700 text-sm mb-3">
                This call was identified as an IRS Tax Scam with 98% confidence
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="text-red-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span className="text-red-700">Today, 2:34 PM - 3 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-red-600" />
                  <span className="text-red-700">Claimed to be "Agent Johnson from IRS"</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Scam Type Details */}
        <Card className="p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Scam Type: IRS Tax Scam</h3>
          <p className="text-slate-600 text-sm mb-4">
            The caller impersonated an IRS agent and threatened immediate arrest unless payment was made. 
            This is a common scam pattern where criminals exploit fear of tax authorities.
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-800 mb-2">Key Red Flags Detected:</h4>
            <ul className="space-y-1 text-sm text-amber-700">
              <li>• Demanded immediate payment</li>
              <li>• Threatened arrest within 24 hours</li>
              <li>• Requested payment via gift cards</li>
              <li>• Refused to provide official documentation</li>
            </ul>
          </div>
        </Card>

        {/* Safety Tips */}
        <Card className="p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>How to Stay Protected</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-slate-800 text-sm">Verify the Caller</h4>
                <p className="text-slate-600 text-xs">
                  Always hang up and call the official number directly from their website
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-slate-800 text-sm">Never Pay Immediately</h4>
                <p className="text-slate-600 text-xs">
                  Legitimate agencies don't demand immediate payment or threaten arrest
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-slate-800 text-sm">Protect Personal Information</h4>
                <p className="text-slate-600 text-xs">
                  Never share SSN, bank details, or passwords over unsolicited calls
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-slate-800 text-sm">Report Suspicious Calls</h4>
                <p className="text-slate-600 text-xs">
                  Report scam calls to FTC and your phone carrier to help protect others
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Official Contacts */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-3">Official IRS Contact</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">Phone:</span>
              <span className="text-blue-800 font-medium">1-800-829-1040</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Website:</span>
              <span className="text-blue-800 font-medium">irs.gov</span>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/')}
            className="w-full security-button"
          >
            Return to Dashboard
          </Button>
          
          <Button
            onClick={() => navigate('/scam-call')}
            variant="outline"
            className="w-full"
          >
            Analyze Another Call
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCallReport;
