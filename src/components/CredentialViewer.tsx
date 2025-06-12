
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Shield, Calendar, User, FileText, Download } from "lucide-react";

interface Credential {
  id: string;
  type: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  status: 'verified' | 'pending' | 'expired';
  data: Record<string, any>;
}

interface CredentialViewerProps {
  credential: Credential;
  onClose: () => void;
  onDownload: (credential: Credential) => void;
}

const CredentialViewer = ({ credential, onClose, onDownload }: CredentialViewerProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'expired':
        return 'bg-red-500/20 text-red-400 border-red-400/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-effect border-primary/20 neon-glow w-full max-w-2xl max-h-[90vh]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-gradient flex items-center gap-2">
              <FileText className="w-6 h-6" />
              {credential.type}
            </CardTitle>
            <p className="text-muted-foreground">Credential Details</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(credential.status)}>
              <Shield className="w-3 h-3 mr-1" />
              {credential.status}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <User className="w-4 h-4" />
                Issuer
              </div>
              <p className="text-muted-foreground">{credential.issuer}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="w-4 h-4" />
                Issue Date
              </div>
              <p className="text-muted-foreground">
                {new Date(credential.issuedDate).toLocaleDateString()}
              </p>
            </div>
            
            {credential.expiryDate && (
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="w-4 h-4" />
                  Expiry Date
                </div>
                <p className="text-muted-foreground">
                  {new Date(credential.expiryDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Credential Data</h3>
            <ScrollArea className="h-64 w-full rounded-md border border-primary/20 p-4">
              <div className="space-y-3">
                {Object.entries(credential.data).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-medium text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </div>
                    <div className="col-span-2 text-sm text-foreground break-words">
                      {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => onDownload(credential)} 
              className="flex-1 bg-primary hover:bg-primary/80"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Credential
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CredentialViewer;
