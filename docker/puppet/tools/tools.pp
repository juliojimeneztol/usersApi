class tools {
	package { 
		['git','ant','openvpn','tar','telnet','java-1.7.0-openjdk-devel','java-1.7.0-openjdk','nano'] :ensure  => present
	}	
}
