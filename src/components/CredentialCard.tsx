
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Shield, Eye, Download } from "lucide-react";

interface Credential {
  id: string;
  type: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  status: 'verified' | 'pending' | 'expired';
  data: Record<string, any>;
}

interface CredentialCardProps {
  credential: Credential;
  onView: (credential: Credential) => void;
  onDownload: (credential: Credential) => void;
}

const CredentialCard = ({ credential, onView, onDownload }: CredentialCardProps) => {
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
    <Card className="glass-effect border-primary/10 hover:border-primary/30 transition-all duration-300 hover:neon-glow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg text-gradient">{credential.type}</CardTitle>
          <Badge className={getStatusColor(credential.status)}>
            <Shield className="w-3 h-3 mr-1" />
            {credential.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Issued by {credential.issuer}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Issued: {new Date(credential.issuedDate).toLocaleDateString()}
          </div>
          {credential.expiryDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Expires: {new Date(credential.expiryDate).toLocaleDateString()}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          {Object.entries(credential.data).slice(0, 3).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <span className="text-foreground truncate ml-2">{String(value)}</span>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onView(credential)} className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDownload(credential)}>
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CredentialCard;
