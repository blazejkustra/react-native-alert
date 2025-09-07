require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "ReactNativeAlert"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://github.com/blazejkustra/react-native-alert.git", :tag => "#{s.version}" }

  # No iOS native sources are needed; JS uses RN's Alert on iOS
  s.source_files = ""
  s.private_header_files = ""


  install_modules_dependencies(s)
end
