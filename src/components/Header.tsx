import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Wallet, 
  Menu, 
  X, 
  Shield, 
  Globe, 
  Users,
  Bell,
  Settings,
  Sun,
  Moon
} from "lucide-react";
import { useWeb3 } from "@/contexts/Web3Context";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  currentProfile?: any;
  onCreateProfile?: () => void;
}

const Header = ({ currentProfile, onCreateProfile }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { account, isConnected, connectWallet, disconnectWallet } = useWeb3();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleWalletAction = async () => {
    if (isConnected) {
      disconnectWallet();
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected successfully",
      });
    } else {
      try {
        await connectWallet();
        toast({
          title: "Wallet Connected",
          description: "Your MetaMask wallet is now connected",
        });
      } catch (error) {
        toast({
          title: "Connection Failed",
          description: "Failed to connect to MetaMask wallet",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 glass-effect backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient">DID Manager</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Credentials
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Marketplace
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Community
          </a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <div className="flex items-center space-x-2">
            <Sun className={`w-4 h-4 ${theme === 'light' ? 'text-yellow-500' : 'text-muted-foreground'}`} />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-primary"
            />
            <Moon className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-muted-foreground'}`} />
          </div>

          {/* Network Status */}
          {isConnected && (
            <Badge variant="outline" className="hidden sm:flex border-green-500/30 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Ethereum
            </Badge>
          )}

          {/* Notifications */}
          {currentProfile && (
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                2
              </div>
            </Button>
          )}

          {/* Wallet Connection */}
          <Button
            onClick={handleWalletAction}
            variant={isConnected ? "outline" : "default"}
            className={isConnected ? "border-primary/30" : "bg-primary hover:bg-primary/80"}
          >
            <Wallet className="w-4 h-4 mr-2" />
            {isConnected 
              ? `${account?.substring(0, 6)}...${account?.substring(account.length - 4)}`
              : "Connect Wallet"
            }
          </Button>

          {/* Create Profile Button */}
          {!currentProfile && onCreateProfile && (
            <Button onClick={onCreateProfile} className="hidden sm:flex">
              Create Profile
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-primary/20 glass-effect">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <a href="#" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </a>
            <a href="#" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">
              Credentials
            </a>
            <a href="#" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">
              Marketplace
            </a>
            <a href="#" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">
              Community
            </a>
            {!currentProfile && onCreateProfile && (
              <Button onClick={onCreateProfile} className="w-full mt-4">
                Create Profile
              </Button>
            )}
            
            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between py-2 border-t border-primary/20 mt-4 pt-4">
              <span className="text-sm text-muted-foreground">Theme</span>
              <div className="flex items-center space-x-2">
                <Sun className={`w-4 h-4 ${theme === 'light' ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-primary"
                />
                <Moon className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-muted-foreground'}`} />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
