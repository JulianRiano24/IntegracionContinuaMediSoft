#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see http://aka.ms/containercompat 

FROM mcr.microsoft.com/dotnet/framework/aspnet:4.8-windowsservercore-ltsc2019
# Next, this Dockerfile creates a directory for your application
RUN mkdir C:\webapp
# configure the new site in IIS.
RUN powershell -NoProfile -Command \
Import-module IISAdministration; \
New-IISSite -Name “ASPNET” -PhysicalPath C:\webapp -BindingInformation “*:8000:”
# This instruction tells the container to listen on port 8000. 
EXPOSE 8000
# The final instruction copies the site you published earlier into the container.
Copy WebApplication/bin/Release/Publish /webapp