
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Edit, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DIDProfileHeaderProps {
  did: string;
  name: string;
  avatar?: string;
  verified: boolean;
  credentialsCount: number;
  onEditProfile: () => void;
}

const DIDProfileHeader = ({ 
  did, 
  name, 
  avatar, 
  verified, 
  credentialsCount, 
  onEditProfile 
}: DIDProfileHeaderProps) => {
  const { toast } = useToast();

  const copyDID = () => {
    navigator.clipboard.writeText(did);
    toast({
      title: "DID Copied",
      description: "Your DID has been copied to clipboard",
    });
  };

  return (
    <Card className="glass-effect border-primary/20 neon-glow">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24 ring-4 ring-primary/50">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="bg-primary/20 text-2xl">
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {verified && (
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 ring-4 ring-background">
                <Shield className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
              <h1 className="text-3xl font-bold text-gradient">{name}</h1>
              {verified && (
                <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                  Verified Identity
                </Badge>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
              <code className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-md break-all">
                {did}
              </code>
              <Button variant="ghost" size="sm" onClick={copyDID} className="hover:bg-primary/20">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                {credentialsCount} Credentials
              </span>
              <span className="flex items-center gap-1">
                <ExternalLink className="w-4 h-4" />
                On-chain Identity
              </span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button onClick={onEditProfile} className="bg-primary hover:bg-primary/80">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DIDProfileHeader;
